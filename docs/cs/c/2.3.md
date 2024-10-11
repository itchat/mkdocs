# 2.3 Linux Review 

## Fri Workshop 1

Ubuntu 仍然是目前工业界安全考虑范围内最优的系统，提供 LTS 版本

```bash
cal 08 2024
expr 90 \* 2
```

其中 man 手册不同的 Linux 发行商都编写了自己的版本，自己挑选一个

常见 Linux 命令可以在 [Dive into Systems](https://diveintosystems.org/book/Appendix2/index.html) 这本书中找到

### Unix Philosophy

为一个问题写一个最好的工具去解决，解决其他问题的工具可以调用这个工具作为组件解决问题，和 Apple 的开发哲学类似。

### Compiler

gcc 是由 GNU 项目开发和维护的编译器集合, cc 是一个符号链接指向它

```bash
cc -std=c11 -Wall -Werror -o myprogram source.c
```

`-Wall` 启用所有常见的编译警告，`-Werror` 将所有警告视为错误

该指令用 c11 标准和警告规范严格进行编译操作，用于编写高质量代码

## Labsheet 1

该课程会有两个 Projects 占比 50%

Linux 首选的编译器是 gcc 而 macOS 为 clang 其为 2007 年苹果自主研发的编译器作为 LLVM 项目之一

两者都可以被 cc 直接调用，可在 Terminal 中直接执行

### Alias

Linux 中有一种命令快捷键的用法，和 Windows 下的环境变量类似

```bash
vim ~/.bash_profile
```

```bash
alias c="clear"
alias ll="ls -l"
```

```bash
source ~/.bash_profile
```

然后在下次登陆会话时，系统就会自动加载别名机制然后生效

### ROT3

维护结构良好的计算机学习目录层次结构，划分工作逻辑分区

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

// Compile this program with:
//    cc -std=c11 -Wall -Werror -o rotate rotate.c

#define ROT 13

//  The rotate function returns the character ROT positions further along the
//  alphabetic character sequence from c, or c if c is not lower-case

char rotate(char c)
{
    // Check if c is lower-case or not
    if(islower(c)) {
        // The ciphered character is ROT positions beyond c,
        // allowing for wrap-around
        return ('a' + (c - 'a' + ROT) % 26);
    }
    else {
        return c;
    }
}

//  Execution of the whole program begins at the main function

int main(int argcount, char *argvalue[])
{
    // Exit with an error if the number of arguments (including
    // the name of the executable) is not precisely 2
    if(argcount != 2) {
        fprintf(stderr, "%s: program expected 1 argument, but instead received %i\n",
                    argvalue[0], argcount-1);
        exit(EXIT_FAILURE);
    }
    else {
        // Calculate the length of the first argument
        int length = strlen(argvalue[1]);

        // Loop for every character in the text
        for(int i = 0; i < length; i++) {
            // Determine and print the ciphered character
            printf("%c", rotate(argvalue[1][i]));
        }

        // Print one final new-line character
        printf("\n");

        // Exit indicating success
        exit(EXIT_SUCCESS);
    }
    return 0;
}
```

编译期间如果不提供 `-o` 参数直接 `cc rotate.c`  会多出一个 a.out 可执行文件，`a.out` 为默认名

为了严格编译所有 C11 程序，整个 Lab 将采用以下编译参数执行：

```c
cc -std=c11 -Wall -Werror -o rotate rotate.c
```

结合 vim 提供的 alias 功能，可通过编辑 `~/.bash_profile` 添加以下行简化编译流程

```bash
alias mycc="cc -std=c11 -Wall -Werror"
source ~/.bash_profile
```

日后的编译流程就直接能简化成：

```bash
mycc -o rotate rotate.c
```

### Linux Commands

除去常见滚瓜烂熟的指令模式：

```bash
man -k vim
# -k 列出所有 vim 简述

ls -lt 
# 按照时间排序

ls -lR
# 多文件夹循环列举

cp -R olddir newdir
# 多文件夹循环拷贝

du -sh dirname
# 用人性化格式显示该文件夹磁盘使用状况

cat -s filename
# 去空行查看文件

head -3 filename 
head -c 100 filename
tail -3 filename
tail -c 100 filename
# 从文件开头或结尾阅读特定行或字数

wc -l filename
# 默认是显示字数、单词数和行数，-l 是文件行数

grep pattern filename
grep -c pattern filename
# 显示匹配这种模式的次数
grep -i pattern filename
# 忽略文件大小写

ps aux
# 所有进程和属性
```

### 1. Integer Arithmetic

澳大利亚超市找零小程序，输入商品价格输出支付 100 分后得到的找零信息，找零硬币种类有 1c 2c 5c 10c 20c 50c

```c
#include <stdio.h>
#include <stdlib.h>

int main(int const argc, char *argv[]) {
    // argc 代表的参数数量，argv 储存所有参数
    // %dn means a integer with a line break
    if (argc != 2) {
        printf("Format Error, please use ./change cents.\n");
        return 0;
    }

    int const price = atoi(argv[1]);

    if (price <= 0 || price > 100) {
        printf("Data Type Error, please use int and the price needs to <= 100.\n");
        return 0;
    }

    int change = 100 - price;
    int const coin_50 = change / 50;
    change = change % 50;
    int const coin_20 = change / 20;
    change = change % 20;
    int const coin_10 = change / 10;
    change = change % 10;
    int const coin_5 = change / 5;
    change = change % 5;
    int const coin_2 = change / 2;
    change = change % 2;
    int const coin_1 = change / 1;
    printf("%d 50c, %d 20c, %d 10c, %d 5c, %d 2c, %d 1c for changes.\n", coin_50, coin_20,
    coin_10, coin_5, coin_2, coin_1);
}
```

这道题是贪心算法和动态规划常考的题，但是在不用算法的情况下，只能手动更新余额并手动降序取余数最终整体将答案答应出来；程序在编写过程中理解了 C 的一些细节：

1. `printf` 第一个参数必须为字符串，所有的拼接都是用 % 开头的替换符拼接上去

2. argc 为 arg count 也就是数量，./main 算 argv[0] 因此算两个

3. argv 为 char 数组, char * 为指针指向其中的一个 char

4. In C, you cannot directly cast a string (which argv[1] is, as a char *) to an int because a string is a sequence of characters (a pointer) and not directly an integer value. 

   由于直接内存管理和底层的数据类型转换设计，C 语言并不支持像 Python 一样直接转换数据类型，需要用 atoi 这个包将 pointer 找到后成功转换。`char str[] = "Hello, World!";` 为字符串数据类型声明方式。 

### 2. Call system date function

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    printf("%d",system("date"));
    return 0;
}
```

调用系统依然英 `stdlib` 包中的 `system` 函数，date 的输出有意思的是整数，并且程序输出后会答应一个 0, 这是代表 the date command executed successfully with an exit status of 0.

### 4. Array

随机大乐透洗牌程序

```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main() {
    srand(time(NULL));
    int result[6];
    for (int i = 0; i < 6; i++) {
        int const ranNum = rand() % 100;
        result[i] = ranNum;
        printf("%d\n", result[i]);
    }
}
```

计算机科学领域有真随机数和伪随机数的概念，为了保证每次生成的数为真随机，导入 `time(NULL)` 返回一个 time_t 类型的值，表示当前时间与 Unix 纪元 (1970年1月1日00:00:00 UTC) 的秒差值，数据类型为 long int 打印用 `%ld`。这样每一次获取随机数的时候，生成种子都是不一样的，`%` 能够保证无论多大的随机数最终都能控制在 0 ~ 100 的范围之内。

### Tasks

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

// Compile this program with:
//    cc -std=c11 -Wall -Werror -o rotate rotate.c

#define ROT 13

//  The rotate function returns the character ROT positions further along the
//  alphabetic character sequence from c, or c if c is not lower-case

char rotate(char c)
{
    // Check if c is lower-case or not
    if(islower(c)) {
        // The ciphered character is ROT positions beyond c,
        // allowing for wrap-around
        return ('a' + (c - 'a' + ROT) % 26);
    }
    else {
        return c;
    }
}

//  Execution of the whole program begins at the main function

int main(int argcount, char *argvalue[])
{
    // Exit with an error if the number of arguments (including
    // the name of the executable) is not precisely 2
    if(argcount != 2) {
        fprintf(stderr, "%s: program expected 1 argument, but instead received %i\n",
                    argvalue[0], argcount-1);
        exit(EXIT_FAILURE);
    }
    else {
        // Calculate the length of the first argument
        int length = strlen(argvalue[1]);

        // Loop for every character in the text
        for(int i = 0; i < length; i++) {
            // Determine and print the ciphered character
            printf("%c", rotate(argvalue[1][i]));
        }

        // Print one final new-line character
        printf("\n");

        // Exit indicating success
        exit(EXIT_SUCCESS);
    }
    return 0;
}
```

#### ROT 13 -> ROT 3

第 9 行的 13 改为 3, 45 行加个换行符

#### POSITION

```c
printf("%c, %c\n", argvalue[1][i], rotate(argvalue[1][i]));
```

可以看到 char 用的解析符号为 `%c` 

#### ORIGINAL CHAR

```c
printf("%c, %c, %d\n", argvalue[1][i], rotate(argvalue[1][i]), i + 1);
```

#### DEAL WITH CAPITAL CHAR

```c
char rotate(char c)
{
    // Check if c is lower-case or not
    if(islower(c)) {
        // The ciphered character is ROT positions beyond c,
        // allowing for wrap-around
        return ('a' + (c - 'a' + ROT) % 26);
    }
    return ('A' + (c - 'A' + ROT) % 26);
}
```

#### Explanation

```c
#include <stdio.h>
```

主要在代码中支持 `fprintf` `printf` 两个函数，fprintf 能够定义指定的输出流，在内存中打印，可以在 buffer 网络中操作等等

```c
int fprintf(FILE *stream, const char *format, ...);
```

```c
fprintf(stderr, "An error occurred: %s\n", "File not found");
```

代码中定义标准错误输出为此提示

**标准流**：

- stderr：标准错误流，通常用于输出错误信息。
- stdout：标准输出流，通常用于正常输出。
- stdin：标准输入流，通常用于获取用户输入。

- scanf：用于从标准输入流读取格式化输入。

- fopen：用于打开一个文件以进行读取或写入。

- fclose：用于关闭一个打开的文件。

- fgets：用于从文件流中读取一行文本。

---

```c
#include <stdlib.h>

// 用于以下两个函数
exit(EXIT_SUCCESS);
exit(EXIT_FAILURE);
```

是 C 语言中的一个函数调用，用于终止当前程序并返回一个状态码给操作系统。

---

```c
#include <string.h>

// strlen() 函数调用计算 char 字符长度
```

---

```c
#include <ctype.h>

// islower() 
```

ctype 主要用于处理字符的分类和转换，它提供了一系列函数，用于检查字符的类型（如字母、数字、空白字符等）以及将字符进行大小写转换等操作。
