# 2.4 MyCal

## Fri Workshop 2

主要旨在创建一个 cal 一样的 c 编写的日历程序，用 double for loop 打印 4 月或 8 月的日历，从直接调用系统的 cal 到自己编写，熟悉之前课程的知识点。

该程序的核心算法一共有两个：

1. 二维矩阵的屏幕显示

2. 如何精确显示日期属于星期几

```bash
   December 2023
Su Mo Tu We Th Fr Sa
.. .. .. .. ..  1  2 
 3  4  5  6  7  8  9 
10 11 12 13 14 15 16 
17 18 19 20 21 22 23 
24 25 26 27 28 29 30 
31 .. .. .. .. .. .. 
```

二维矩阵可以用嵌套 for loop 解决，而第一行的内容可根据参数的输入单独处理，第二行可单独打印，solution 中将寻找指定月份的第一天是星期几的算法单独提炼成一个文件提供给主程序 `#include`

## first_day_of_month.c

```c
#include <time.h>
#include <string.h>

//  written by ...

//  PROVIDED WITHOUT MUCH EXPLANATION YET!

//  RETURNS  0=Sun, 1=Mon, .....
//
int first_day_of_month(int month, int year)
{
    struct tm tm;

//  SET ALL FIELDS OF tm TO ZERO TO MAKE SOME FIELDS 'UNKNOWN'
    memset(&tm, 0, sizeof(tm));

//  INITIALIZE THE FILEDS THAT WE ALREADY KNOW
    tm.tm_mday  = 1;
    tm.tm_mon   = month-1;              // 0=Jan, 1=Feb, ....
    tm.tm_year  = year-1900;

//  ASK THE POSIX FUNCTION mktime TO DETERMINE THE 'UNKNOWN' FIELDS
//  See: http://pubs.opengroup.org/onlinepubs/9699919799/
    mktime(&tm);

//  RETURN THE INTEGER MONTH VALUE
    return tm.tm_wday;                  // 0=Sun, 1=Mon, .....
}
```

### Analyzation

#### mktime

算法的核心工具为一个叫 mktime 的函数：

> mktime 函数使用 struct tm 中提供的字段来计算时间，并将那些没有明确指定的字段（例如 tm_wday 和 tm_yday）计算出来。如果 struct tm 中的某些字段未初始化且包含垃圾值，mktime 可能会产生错误的结果。因此，使用 memset 可以避免这些潜在的问题。

#### struct

struct 结构体其在 Python 中可以被理解为丧失了 function 功能的 class，定义数据结构:

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

# 创建类的实例
p1 = Point(10, 20)
print(p1.x, p1.y)  # 输出: 10 20
```

在 time.h 中 c 语言使用了结构体定义了 tm 这种数据类型：

```c
struct tm {
	int	tm_sec;		/* seconds after the minute [0-60] */
	int	tm_min;		/* minutes after the hour [0-59] */
	int	tm_hour;	/* hours since midnight [0-23] */
	int	tm_mday;	/* day of the month [1-31] */
	int	tm_mon;		/* months since January [0-11] */
	int	tm_year;	/* years since 1900 */
	int	tm_wday;	/* days since Sunday [0-6] */
	int	tm_yday;	/* days since January 1 [0-365] */
	int	tm_isdst;	/* Daylight Savings Time flag */
	long	tm_gmtoff;	/* offset from UTC in seconds */
	char	*tm_zone;	/* timezone abbreviation */
};
```

因此 `struct tm tm` 为声明一个 tm 数据结构的名为 tm 的变量

```c
memset(&tm, 0, sizeof(tm));
```

memset 是一个标准库函数，用于将一块内存区域中的所有字节设置为指定的值。memset 将 tm 结构体的所有字段都设置为 0. 为了保证 mktime 函数的工作正常调用该函数进行初始化，如果不调用手动初始化相对来说较为麻烦：

```c
tm.tm_sec = 0;
tm.tm_min = 0;
tm.tm_hour = 0;
tm.tm_mday = 1;
tm.tm_mon = month - 1;
tm.tm_year = year - 1900;
tm.tm_wday = 0;  // 这些字段实际上会被 mktime 重新计算
tm.tm_yday = 0;
tm.tm_isdst = 0;
```

在 `time.h` 文件里可以看到天为 1 - 31 正常传参定义，周为 0 - 11 计算，年为从 1900 年算起，因此在后续传参数给 `first_day_of_month(int month, int year)` 后，会被自动定义为指定年份的指定月数的第一天。经过 mktime 函数计算过后会返回没有定义的变量，tm_wday 会返回 0 - 6 分别依次代表周末 - 周六。

## mycal.c

```c
#include <stdio.h>
#include <stdlib.h>

#include "first_day_of_month.c"

#define DEFAULT_MONTH           8
#define DEFAULT_YEAR            2023

#define NWEEKS                  6
#define DAYS_PER_WEEK           7

void print_cal(int month, int year)
{
    int day1        = first_day_of_month(month, year);
    int daysinmonth = 0;

    switch (month) {
        case 1: printf("   January %i\n", year);
                daysinmonth = 31;
                break;

        case 2: printf("   February %i\n", year);
                daysinmonth = 28;
                break;

        case 3: printf("   March %i\n", year);
                daysinmonth = 31;
                break;

        case 4: printf("   April %i\n", year);
                daysinmonth = 30;
                break;

        case 5: printf("   May %i\n", year);
            daysinmonth = 31;
            break;

        case 6: printf("   April %i\n", year);
            daysinmonth = 30;
            break;

        case 7: printf("   April %i\n", year);
            daysinmonth = 30;
            break;

        case 8: printf("   August %i\n", year);
            daysinmonth = 31;
            break;

        case 9: printf("   September %i\n", year);
            daysinmonth = 30;
            break;

        case 10: printf("   October %i\n", year);
            daysinmonth = 31;
            break;

        case 11: printf("   November %i\n", year);
            daysinmonth = 30;
            break;

        case 12: printf("   December %i\n", year);
            daysinmonth = 31;
            break;
    }

    printf("Su Mo Tu We Th Fr Sa\n");

    int day = 1 - day1;
    for(int w=0 ; w<NWEEKS ; ++w) {
        for(int d=0 ; d<DAYS_PER_WEEK ; ++d) {
            if(day < 1 || day > daysinmonth) {
                printf(".. ");
            }
            else {
                printf("%2i ", day);
            }
            ++day;
        }
        printf("\n");
    }
}

int main(int argcount, char *argvalue[ ])
{
    int month   = DEFAULT_MONTH;
    int year    = DEFAULT_YEAR;

    if(argcount > 1) {
        month   = atoi(argvalue[1]);
        if(argcount > 2) {
            year = atoi(argvalue[2]);
        }
    }

    print_cal(month, year);

    return 0;
}
```

程序的核心片段算法为该 nested for loop:

```c
for(int w = 0; w < NWEEKS; ++w) {
    for(int d = 0; d < DAYS_PER_WEEK; ++d) {
        if(day < 1 || day > daysinmonth) {
            printf(".. ");
        }
        else {
            printf("%2i ", day);   // format using 2 columns
        }
        ++day;
    }
    printf("\n");       // move printing to a new line after each week
}
```

### Outer Loop

**w** **变量**：表示当前的周数，从 0 开始到 NWEEKS - 1，这里 NWEEKS 被定义为 6，意味着最多打印 6 行，每行代表一周。

**循环作用**：外层循环负责控制行数（即周数），每一轮循环打印一周的日期。

### Inner Loop

**d** **变量**：表示当前的天数（从周日到周六），从 0 开始到 DAYS_PER_WEEK - 1，这里 DAYS_PER_WEEK 被定义为 7，表示一周七天。

**循环作用**：内层循环负责控制一周中每天的输出，确保在每一行中打印出从周日到周六的日期。

### 判断逻辑

```c
if(day < 1 || day > daysinmonth) {
    printf(".. ");
} else {
    printf("%2i ", day);   // format using 2 columns
}
```

- **day** **变量**：day 是一个整数，表示当前需要打印的日期。这个变量最初被初始化为 1 - day1，其中 day1 是这个月第一天的星期数（例如，0 表示星期日，1 表示星期一，以此类推）。

- **if(day < 1 || day > daysinmonth)** **条件**：

  - 如果 day 小于 1（表示当前的日期在这个月开始之前）或者大于 daysinmonth（表示当前的日期已经超出了这个月的天数），就打印 ".." 作为占位符。

  - 这样可以保持每一行的格式一致，尤其是在第一个星期开始之前的空白处和最后一个星期结束后的空白处。

- **else** **分支**：

  - 如果 day 在合法范围内（即大于或等于 1 且小于或等于 daysinmonth），则打印当前日期。%2i 的格式字符串表示打印一个右对齐的两位数日期。

  - **++day**：每打印一天，day 变量自增 1，移动到下一个日期。

- 在内层循环结束后，调用 printf("\n"); 将打印移动到下一行，从而开始打印下一周的日期。

## Conclusion

该程序核心为调用 mktime 函数传参指定年份和月数以及当月的第一天，获得其返回的当月的第一天属于第几周。然后使用 nested for loop 打印二维矩阵：外层负责控制最大周数，一个月最大的周数不会超过 6 行，因此在打印 2 月的时候可以发现最后一周全部被替换成了 ..

```bash
   February 2023
Su Mo Tu We Th Fr Sa
.. .. ..  1  2  3  4 
 5  6  7  8  9 10 11 
12 13 14 15 16 17 18 
19 20 21 22 23 24 25 
26 27 28 .. .. .. .. 
.. .. .. .. .. .. .. 
```

内层循环主要判断当月第一天的起始位置，用 1 - day1 的算法确定有多少个空天数，例如周五就是 -4, [-4, -3, -2, -1, 0] 一直到等于 1 的时候就能确认该列是第一天，然后用 `%2i` 的格式保证两个字段宽度输出天数，主要为了保证格式化输出后的美观整齐，然后逐渐增加 day 的天数直到超过当月提前定义好的最大天数。

```bash
   December 2023
Su Mo Tu We Th Fr Sa
.. .. .. .. ..  1  2 
 3  4  5  6  7  8  9 
10 11 12 13 14 15 16 
17 18 19 20 21 22 23 
24 25 26 27 28 29 30 
31 .. .. .. .. .. .. 
```

程序用到了 atoi 给 argvalue 转换数据类型为 integer, 用 switch 语句提前打印第二行的月份并手动定义最大天数，因此在 switch 中没有用到 default 语句。教授还用到了 `#define` 语句提前定义一些常量，节省内存与编译器时间。
