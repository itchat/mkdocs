# 4.0 Loop

## Switch

```java
import java.util.Scanner;

public class Switch {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = scanner.nextInt();
        switch (num) {
            case 1:
                System.out.println("One");
                break;
            case 2:
                System.out.println("Two");
                break;
            case 3:
                System.out.println("Three");
                break;
            default:
                System.out.println("Other");
        }
    }
}
```

## While

```java
import java.util.Scanner;

public class Break {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        while (true) {
            System.out.print("Are you ready for this program to end? Enter true or false: ");
            boolean answer = scanner.nextBoolean();
            if (answer)
                break;
        }
    }
}
```

## Do-while loops

```java
import java.util.Scanner;

public class DoWhile {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        boolean answer; // Note that this variable is declared outside the loop.
        do {
            System.out.print("Are you ready for this program to end? Enter true or false: ");
            answer = scanner.nextBoolean();
        } while (!answer);
    }
}
```

无论是 Python 还是 Java 都是当 While 中的条件满足时继续执行该 Loop

`while (i <=10)` 当 i 小于 10 时继续执行该循环，或直接当这个条件为 true 时

## Empty statements

```java
public class EmptyStatement {
    public static void main(String[] args) {
        ;;; // Empty statements
        int x = 10;
        for (x = 0; x < 3; x++);
        System.out.println("x=" + x);
    }
}
```

在 for 循环中，分号表示循环体为空，循环的条件满足时并不会执行任何操作。

循环完后，x 的值会被打印出来。

这种写法在需要的情况下保持代码的简洁性，特别在循环中不需要任何额外操作时。

```java
import java.util.Scanner;

public class EmptyForLoop {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int x = sc.nextInt();
        for (; x > 0; --x)
            System.out.println("x=" + x);
    }
}
```

## For-Each loops

```java
for (int num : nums) {
    System.out.println(num);
}
```

## Continue

continue ends execution early and goes to the next iteration

```java
public class Continue {
    public static void main(String[] args) {
        for (int i = 1; i <= 20; i++) {
            if (i % 2 == 0)
                continue;
            System.out.println(i);
        }
    }
}
```

## OOP

同一文件夹下可以自动识别路径，其他文件路径需要导入

```java
javac BankExample.java
java BankExample
```

编译器会自动寻找相关 class 最终直接执行 Main 所在的 class 即可得到结果

### return

```java
class BankAccount3 {
    String ownerName;
    int balance;

    void depositMoney(int amount) {
        if (amount < 0) {
            System.out.println("You can't deposit a negative amount!");
            return;
        }
        balance += amount;
    }
}
```

return 会直接结束方法的执行，类似于 break

### Constructor

```java
class BankAccount5 {
    String ownerName;
    int balance;

    BankAccount5() {
        ownerName = null;
        balance = 0;
    }
}
```

类当作设计图纸，模具，对象 object / instance 当作实际制造出来的东西

而构造器用于对象的初始化过程，工厂用其准备好初始生产步骤

- new 关键字创建新对象的时候被自动调用
- 可以有多个参数不同的 constructor
- 没有返回类型
- 没写 Java 也会给你一个啥也不做无参数隐藏的默认构造器，写了就不再提供

### this

```java
class BankAccount6 {
    String ownerName;
    int balance;

    BankAccount6(String ownerName, int balance) {
        this.ownerName = ownerName;
        this.balance = balance;
    }
}
```

`this` 关键词用于区分 parameters 和 field

- field 就是 class 的属性
- parameters 参数
- `this.name` always means a field; 把用户传经来的参数保存在字段里

---

# 5.0 Class

## String Type

String 类型用于储存一串 char, 在 Java 中 String 不是一个基本数据类型，属于一个 class，因此这意味着 String 的每个 instance 都是一个对象。

### Literal

```java
String hi = "hello";
```

运行之前就已经被编译器知道并准备好了

### New

```java
String s3 = new String(s);
```

------

String 类型是不可变 immutable 的，一旦被创建出来，内容就不能被改变

虽然有些方法比如 `String s = "Hello" + "World";` 会让人觉得改变了但是实际上并不是在原有的对象上上进行修改了 `s` 而是创建了一个全新的 String 对象存放结果。那么如果就是想像修改数组一样修改字符的某个数组，先将其变为一个字符数组 `char[]`

- `toCharArray()`

`return` 一个字符串副本

数组可变，修改完成后可以用这个修改过后的字符数组创建一个新的 String 对象

- `length()`

直接返回字符串中字符的数量

- `charAt(int index)`

获取位于特定索引的字符，从 0 开始

- `substring(int start, int end)` **和** `substring(int start)`

这些方法用来获取字符串的**子串**，`end` 不包含

```java
public class Substring {
    public static void main(String[] args) {
        String s = "CITS2005"; // 原始字符串
        String cits = s.substring(0, 4);
        String code = s.substring(4);
        System.out.println(cits + " -- " + code); // CITS -- 2005
    }
}
```

- **`equals(Object other)`**

比较对象中的内容

```java
public class ToCharArrayDemo {

    public static void main(String[] args) {
        String originalString = "Hello World";
        char[] charArray = originalString.toCharArray();
        System.out.println("使用 toCharArray() 转换后得到的字符数组 (内容): " + new String(charArray)); // 转换回 String
        if (charArray.length > 6) {
            charArray[3] = '_';
            System.out.println("修改后的字符数组 (内容): " + new String(charArray));
        }
        System.out.println("验证: 原始字符串 originalString 仍然是: " + originalString);

    }
}
```

## MyString Class

为了更好的理解 String，引入一个练习如何自己实现一个 String 类

- 数组是 `.length`
- `String` 是 `.length()`

```java
public class MyString {
    private char[] chars;

    public MyString(char[] chars) {
        this.chars = new char[chars.length];
        for (int i = 0; i < chars.length; i++) {
            this.chars[i] = chars[i];
        }
    }

    public char charAt(int index) {
        return chars[index];
    }

    public int length() {
        return chars.length;
    }

    public boolean equals(MyString s) {
        // 先对比长度，再逐个对比 char[] 中元素
        if (length() != s.length())
            return false;
        for (int i = 0; i < length(); i++) {
            if (charAt(i) != s.charAt(i))
                return false;
        }
        return true;
    }

    /**
     * 将原始字符串（或其内部字符数组）中从 start 索引开始
     * 到 end - 1 索引结束的字符，逐一复制到新创建的字符数组 (newChars) 中。
     */
    public MyString substring(int start, int end) {
        // 1. 计算所需空间，生成一个新的 char[] 用于返回
        char[] newChars = new char[end - start];
        // 2. 循环遍历，不包含 end，这个算法可以动态同时满足两边的需求
        for (int i = start; i < end; i++) {
            newChars[i - start] = chars[i]; // (2, 4) 3 - 2 = chars[3]
        }
        return new MyString(newChars);
    }

    public MyString concatenate(MyString s) {
        char[] newChars = new char[chars.length + s.length()];
        for (int i = 0; i < chars.length; i++) {
            newChars[i] = chars[i];
        }
        for (int i = 0; i < s.length(); i++) {
            newChars[chars.length + i] = s.charAt(i);
        }
        return new MyString(newChars); // 由于不是 static 要生成对象
    }

    public class MyStringExample {
        public static void main(String[] args) {
            MyString s = new MyString("Hello".toCharArray());
            s.chars[0] = 'J';
            for (int i = 0; i < s.length(); i++)
                System.out.println(s.charAt(i));
        }
    }
}
```

## Private and Public

软件工程两大准则：

- data hiding
  - 用 `private` 实现
- encapsulation
  - 把代码和数据打包成容易使用的对象，这就是一个类。数据隐藏可以保护用户不受复杂性的影响，他们只需要了解公共部分就可以了。这就叫封装。

```java
public class SafeArray {
    private int size;
    private int[] array;

    public SafeArray(int size) {
        this.size = size;
        this.array = new int[size];
    }

    private boolean isValidIndex(int index) {
        return index >= 0 && index < size;
    }

    public int get(int index) {
        if (isValidIndex(index))
            return array[index];
        System.out.println("Invalid index: " + index);
        return 0;
    }

    public void set(int index, int value) {
        if (isValidIndex(index))
            array[index] = value;
        else
            System.out.println("Invalid index: " + index);
    }
}
```

用 `void` `set` 以及 `get` 实现有限度的 `public` 访问机制

## Pass by reference

- 上次课我们看到了方法和构造函数可以有参数，这些参数可以是类
- 这意味着传递进来的值是对象
- 要理解这是怎么工作的，我们需要知道值传递和引用传递
- 我们已经看到，存储对象的变量（或数组）实际上存储的是引用
- 存储原始类型的变量直接存储值
- 这是一样的。原始类型的值会被复制（值传递），对象则会被引用（引用传递）
- 这很有道理。原始类型通常复制起来更高效（比如一个 int），但对象通常要大得多

```java
public void copyInto(SafeArray other) {
    if (other.size != size) {
        System.out.println("Arrays are not the same size");
        return;
    }
    for (int i = 0; i < size; i++) {
        other.array[i] = array[i];
    }
}
```

传递了一个 `SafeArray` 类型的数组对象，确保大小一致后开始将输入对象数组替换

`public` 方法一样可以接入 `private` 变量，只要是在同一个类中

## Return by reference

```java
public SafeArray append(int value) {
    SafeArray newArray = new SafeArray(size + 1);
    for (int i = 0; i < size; i++)
        newArray.array[i] = array[i];
    newArray.array[size] = value;
    return newArray;
}
```

实现一个和 `python` 一样的 `append` 方法需要考虑内存，返回一个对象地址

## Overloading

- 在 Java 里，好几种方法可以叫同一个名字。
- 这就是所谓的重载。
- 只要它们的参数不一样，Java 就能知道你想调用哪个。

比如说如果不返回对象再建立一个 `void` 同名函数 `append`

比如建立一个不同参数的 constructor, 都可以被自动识别

## Recursion

```java
public class Fibonacci {
    public static void main(String[] args) {
        Fibonacci f = new Fibonacci();
        for (int i = 1; i <= 10; i++)
            System.out.println(f.fib(i));
    }

    public int fib(int n) {
        if (n <= 2)
            return 1;
        else
            return fib(n - 1) + fib(n - 2);
    }
}
```

## static

该特殊字符只属于类，不属于对象

`ClassName.myStaticMethod`

```java
public class StaticFib {
    public static void main(String[] args) {
        for (int i = 1; i <= 10; i++)
            System.out.println(StaticFib.fib(i));
    }

    public static int fib(int n) {
        if (n <= 2)
            return 1;
        else
            return fib(n - 1) + fib(n - 2);
    }
}
```

可以看到第 4 行直接调用的是类名，如果不写类名直接用 `fib(i)` 自动查询当前类是否有该方法

### Static Fields

```java
public class StaticX {
    public static String x;
}
```

`StaticX.x` 也是这样访问

无论你创建多少个该类的对象，或者根本不创建对象，这个**静态字段都只有一份存储空间**，存在于类级别。不像实例字段，每个对象都有自己的那一份。所有实例都共享同一个字段：因为静态字段只有一份。

```java
public class StaticXTest {
    public static void main(String[] args) {
        StaticX instance = new StaticX();
        StaticX instance2 = new StaticX();
        instance.x = "Hello";
        instance2.x = "Goodbye";
        StaticX.x = "World";
        System.out.println(StaticX.x + " " + instance.x + " " + instance2.x);
    }
}
```

---

# 6.0 Inheritance

## Inheritance

- code reuse and abstraction
- A subclass inherits all the members (fields and methods, not constructors) of its superclass

### BasicSafeArray

```java
public class BasicSafeArray {
    protected int size;
    protected int[] array;

    public BasicSafeArray(int size) {
        // see full code
    }

    public int size() {
        // see full code
    }

    protected boolean isValidIndex(int index) {
        // see full code
    }

    public int get(int index) {
        // see full code
    }

    public void set(int index, int value) {
        // see full code
    }
}
```

#### AppendableSafeArray

```java
public class AppendableSafeArray extends BasicSafeArray {
    // Constructor
    AppendableSafeArray(int size) {
        super(size);
    }

    // Method to append a value
    public void append(int value) {
        int newSize = size + 1;
        int[] newArray = new int[newSize];
        
        // Copying old array elements to new array
        for (int i = 0; i < size; i++) {
            newArray[i] = array[i];
        }
        
        // Adding the new value
        newArray[size] = value;
        
        // Updating size and array reference
        size = newSize;
        array = newArray;
    }

    // Main method for testing
    public static void main(String[] args) {
        AppendableSafeArray safeArray = new AppendableSafeArray(5);
        safeArray.append(10);
        // You can add more test cases here
    }
}
```

- 用 `extends` 关键词继承非 `private` 方法与字段
- 第三行可以看到需要自己重写 `constructor` 
- 使用 `super` 调用父类 `constructor` 实现初始化 `field size` 

### protected

`protected `is similar to private, but can be accessed by subclasses

但是有一些例外，讨论包时再详细讨论，另外类、方法、字段如果不写权限默认私有

### Field Initialisation

即使没有 `constructor`手动初始化 Java 也会自动加一个，因此打印出来字段值是零

- 字段的工作方式和数组差不多。在对象构建之前，它们会被初始化成一些默认值
- 所有数值类型（比如`int、long、char、double、float` 等等）都会被初始化成零
- 布尔值会被设置为 `false`
- 对象和数组会被设置为 `null`

### Superclass Constructors

```java
public class AppendableSafeArray extends BasicSafeArray {
    AppendableSafeArray(int size) {
        this.size = size;
        this.array = new int[size];
    }
}
```

```java
AppendableSafeArray.java:2: error: constructor BasicSafeArray in
class BasicSafeArray cannot be applied to given types; ... etc
```

- Java 有个规矩：当你创建子类实例时，它必须*先*去调用父类的一个构造函数来完成父类部分的初始化。如果你不明确告诉它调用哪个，Java 就默认去调用父类的*无参数*构造函数（就是 `BasicSafeArray()` 这种括号里啥也没有的）。
- 这段代码里的父类 `BasicSafeArray` 很可能*没有*提供一个无参数的构造函数，或者它有一个需要参数的构造函数，导致 Java 找不到它想默认调用的那个 `BasicSafeArray()`。所以就报错说：“父类的构造函数没法用啊！”
- 为了解决上面的问题，你可以在父类 `BasicSafeArray` 里面*明确地*添加一个无参数的构造函数

```java
public BasicSafeArray() {
    this(0);
}
```

- `this(0);` 特殊用法，就是去调用同一个类 `BasicSafeArray` 中那个需要一个整数（这里是0）作为参数的构造函数。这是一种常见的技巧，用一个构造函数去调用另一个，避免代码重复。
  - 如果你在一个构造函数里想用 `this(...)`（调用自己类的其他构造函数）或者 `super(...)`（调用父类的构造函数），那么这句调用*必须*写在这个构造函数的第一行！不能在它前面写任何其他的代码

#### Hiding Memebrs

- super 来访问超类的构造函数、成员变量或方法
  - 在你想覆盖子类中隐藏的字段或方法时很有用
  - 如果我们子类中重新声明了一个字段或方法，它会隐藏从父类继承的成员
  - 一般来说，我不建议对字段这么做，这通常意味着你的类设计得不好

```java
public class HiddenThing extends Thing {
    public int x; // Hides super.x
    protected float y; // Hides super.y

    public void setSuperTo10() {
        super.x = 10;
        super.y = 10;
    }

    public void setTo100() {
        x = 100;
        y = 100;
    }

    public void print() {
        // see full code
    }

    public void printSuper() {
        // see full code
    }

    public static void main(String[] args) {
        HiddenThing t = new HiddenThing();
        t.setTo100();
        t.setSuperTo10();
        t.print();
        t.printSuper();
    }
}
```

### super in Inheritance Chains

```java
class A {
    public void doSomething() {
        System.out.println("A.doSomething()");
    }
}

class B extends A {
    public void doSomething() {
        System.out.println("B.doSomething()");
    }
}

class C extends B {
    public void doSomething() {
        super.doSomething();
    }
}

public class SuperclassMembers {
    public static void main(String[] args) {
        C c = new C();
        c.doSomething();
    }
}
```

第十五行的 `super` 指向的到底是哪个 `class`

`super` always refers to the immediate superclass 也就是永远是 `extends` 参数后面的那个类

### Multiple Subclasses

一个类可以被多个类拓展，我们可以创建任意复杂的继承树，而不仅仅是链式结构

```java
public class BasicSafeArray {
    // see full code
}

public class AppendableSafeArray extends BasicSafeArray {
    public void append(int value) {
        // see full code
    }
}

public class DeletableSafeArray extends BasicSafeArray {
    public DeletableSafeArray(int size) {
    super(size);

    public void delete(int index) {
        // todo
        }
    }
}
```

那么在正式软件工程中可以模拟系统发育树 Phylogenetic Tree 的层级进行类的组织

### Superclass References

Java 作为强类型语言如果数据类型不匹配会报错，除非有自动或强制类型转换

但是 `X myObj = new Y()` 如果 Y extends X 就不会报错，这是为什么

- When we say Y extends X we’re say that Y is a X
- This is a relationship is really what extends captures

## Method Overriding

由此引出 `polymorphism` 多态性

```java
class Animal {
    public void talk() {
        System.out.println("*Generic animal sounds*");
    }
}

class Goose extends Animal {
    public void talk() {
        super.talk();
        System.out.println("Honk!");
    }
}

public class SuperGoose {
    public static void main(String[] args) {
        Goose a = new Goose();
        a.talk();
    }
}
```

The talk method is getting hidden

### Dynamic Dispatch

动态分派是一种在运行时确定要调用的方法的技术。它允许程序根据对象的实际类型而不是声明的类型来选择正确的方法。这使得代码更灵活，支持多态性，并允许在运行时更改行为。

```java
public class AnimalOverride {
    public static void main(String[] args) {
        Animal a = new Animal();
        a.talk();
        a = new Goose();
        a.talk();
        a = new Dog();
        a.talk();
    }
}
```

由于 Goose, Dog 都是 Animal 因此这样分配没有任何问题，会在执行时自动根据对象类型寻找方法，这实现了多态性

#### Expression

这道题就是 Test1 中的，可以用于编写简易编程语言

```java
public class Expression {
    public void describe() {
        System.out.println("unknown");
    }

    public int evaluate() {
        return 0;
    }

    public static void main(String[] args) {
        Expression expr = new Multiply(new Value(2), new Value(3));
        expr.describe();
        System.out.println(" = " + expr.evaluate());
        expr = new Add(new Value(2), new Value(3));
        expr.describe();
        System.out.println(" = " + expr.evaluate());
        expr = new Add(new Multiply(new Value(2), new Value(3)), new Value(4));
        expr.describe();
        System.out.println(" = " + expr.evaluate());
        expr = new Value(1);
        for (int i = 2; i <= 10; i++)
            expr = new Add(expr, new Value(i));
        expr.describe();
        System.out.println(" = sum of 1 to 10 = " + expr.evaluate());
    }
}
```

可以用其多态性的应用去实现，这道题上课的时候 11 实际上花费了大量时间讲解

##### Multiply

```java
class Multiply extends Expression {
    private Expression left;
    private Expression right;

    public Multiply(Expression left, Expression right) {
        this.left = left;
        this.right = right;
    }

    public void describe() {
        System.out.print("(");
        left.describe();
        System.out.print(" * ");
        right.describe();
        System.out.print(")");
    }

    public int evaluate() {
        return left.evaluate() * right.evaluate();
    }
}
```

##### Add

```java
class Add extends Expression {
    private Expression left;
    private Expression right;

    public Add(Expression left, Expression right) {
        this.left = left;
        this.right = right;
    }

    public void describe() {
        System.out.print("(");
        left.describe();
        System.out.print(" + ");
        right.describe();
        System.out.print(")");
    }

    public int evaluate() {
        return left.evaluate() + right.evaluate();
    }
}
```

```java
expr = new Add(new Multiply(new Value(2), new Value(3)), new Value(4));
expr.describe();
System.out.println(" = " + expr.evaluate());
```

这样的调用方式会启用 stack tree 完成

### @Override

```java
class Animal {
    public void talk() {
        System.out.println("*Generic animal sounds*");
    }
}

class Goose extends Animal {
    public void tallk() { // Oops, typo!
        System.out.println("Honk!");
    }
}

public class AnimalTypo {
    public static void main(String[] args) {
        Animal a = new Goose();
        a.talk();
    }
}
```

**Method overriding 常常成为问题来源：- @Test2**

- The method must have exactly the same signature (**name and parameter list**), otherwise
  - **It will just be a method overload** 过载和覆写是两个东西，把父类的相同函数重写一遍叫 `override`
- If we make a typo, the compiler will not help us - 打错字那么编译器不会帮我们识别
  - 加一个 **annotation** 后编译器会直接返回错误，这种方法更为严谨

### SDLC

<img src="../assets/image-20250502101533697.png" alt="image-20250502101533697" style="zoom:50%;" />

这就是软件开发生命周期，讲述了软件开发是怎么样进行的，循环的本质反映了开发软件通常是迭代的。Java 和类很适合 SDLC 的开发流程：

- 设计阶段需要把问题分解成一个个类。
- 实现阶段就是编写这些类。
- 类为我们提供了清晰的、可测试的代码“单元”，这使得测试更容易。
- 数据隐藏和抽象让我们在不改变接口的情况下更新实现，从而使维护更容易。

---

# 7.0 More, Packages

## More inheritance

### abstract

```java
class Animal {
    public void talk() {
        System.out.println("*Generic animal sounds*");
    }
}

class Goose extends Animal {
    public void talk() {
        System.out.println("Honk!");
    }
}
```

Animal 中强行实现的 talk 很奇怪，因此如果不实现就需要用到 `abstract`

#### AbstractAnimal

```java
abstract class Animal {
    public abstract void talk();
}

class Goose extends Animal {
    @Override
    public void talk() {
        System.out.println("Honk!");
    }
}

public class AbstractAnimal {
    public static void main(String[] args) {
        Animal a = new Goose();
        a.talk();
    }
}
```

- 任何类都可以被声明为抽象类
- `new Animal()` leads to an error, 抽象类无法被初始化
- 任何有抽象方法的类都需要被声明为抽象类
- 抽象方法 need no nody
- Abstract methods must be overridden by subclasses
  -  unless the subclass is abstract too

#### Mistakes

```java
abstract class Animal {
    public abstract void talk();
}

class Goose extends Animal {
    // Error: Did not override abstract method talk()
}

public class AbstractError {
    public static void main(String[] args) {
        Animal a = new Animal(); // Error: Cannot instantiate the type Animal
        a.talk();
    }
}
```

以上就是常见错误，子类没有重载，对抽象类进行了初始化

### final

- 有时候我们想要抽象的反义词。
- 抽象方法必须被重写。
- `final` 方法永远不能被重写、继承。
- 注意，一个有 `final` 方法的类不一定是 `final` 类

#### `final` Classes and Methods

```java
abstract class Animal {
    public abstract int numLegs();
}

class Spider extends Animal {
    public final int numLegs() {
        // All spiders have 8 legs
        return 8;
    }
}

class SpiderWith6Legs extends Spider {
    // Error: Cannot override the final method from Spider
    // public int numLegs() {
    // return 6;
    // }
}
```

在类中使用 `final` 方法可以有效防止任何人错误的从你的类中继承

#### `final` variables

```java
public class FinalVariable {
    public static void main(String[] args) {
        final int x = 5;
        // x = 6; // Error: Cannot assign a value to final variable 'x'
        final double y;
        y = 10.5;
        // y = 1.1; // Error: Cannot assign a value to final variable 'y'
        System.out.println(x);
        System.out.println(y);
    }
}
```

作为常量不再可变

```java
public class CircleTools {
    public static final double PI = 3.14159;

    public static double area(double radius) {
        return PI * radius * radius;
    }

    public static double circumference(double radius) {
        return 2 * PI * radius;
    }

    public static void main(String[] args) {
        System.out.println("Area of a circle with radius 5: " + area(5));
        System.out.println("Circumference of a circle with radius 5: " + circumference(5));
    }
}
```

一般来说 `final` 还和 `static` 绑定在一起，目的是防止任何人重新定义半径

### The Object Class

Java 有一个内置的类叫做 Object

*   每个类都继承自 Object（除了 Object 本身）
*   这意味着 Java 中的每个类在技术上都在同一个继承树中
*   Object 有一些方法，这意味着每个类都自带这些方法
*   有时候，你会想要重写这些方法，[我们来看一下](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/Object.html)

**今天我们将重点关注 toString() 和 equals()。**

#### `toString()`

- **`.toString()` 方法用于将对象转换为字符串表示形式:** 这个方法的主要工作就是提供一个对象的文本描述。当你需要把一个对象用文字表达出来时，就可以调用它的 `toString()` 方法。
- **这个方法在 Object 类中意味着所有对象都可以表示为字符串:** 因为 `toString()` 是 `Object` 类的方法，而所有类都继承自 `Object`，所以 Java 中的任何对象都具备将自己转换成字符串的能力（即使只是默认的、不太易读的格式）。
- **当我们进行字符串连接 ("a string"+myObject) 时，myObject.toString() 会被调用:** 如果你用 `+` 号把一个字符串和一个对象连接起来，Java 会自动调用那个对象的 `toString()` 方法，得到它的字符串形式，然后再进行连接。
- **对于 System.out.println(myObject) 也是一样:** 当你打印一个对象时，`println` 方法内部也会自动调用该对象的 `toString()` 方法，然后打印返回的那个字符串。
- **重写 .toString() 让我们能够控制我们的对象如何被打印:** 通过在你自己的类里重新实现 `toString()` 方法（即“重写”），你可以自定义当对象需要被表示为字符串时（比如打印或字符串连接时），应该显示成什么样子。这能让输出的信息更有意义、更易于理解。

```java
class MyClass {
    private int x;
    private int y;

    public MyClass(int x, int y) {
        this.x = x;
        this.y = y;
    }

    @Override
    public String toString() {
        return "MyClass(" + x + "}," + y + ")";
    }

    public class ToString {
        public static void main(String[] args) {
            MyClass mc = new MyClass(5, 10);
            System.out.println(mc);
            System.out.println("mc.toString() = " + mc);
        }
    }
}
```

#### `equals()`

就像 `toString()` 一样，所有的 Java 对象都从 `Object` 类那里免费得到了一个基础版的 `.equals()` 方法。但是这个**基础版的 `equals()` 方法，它的行为跟 `==` 一模一样** 它也只是检查是不是内存里同一个对象。这通常不是我们想要的“内容相等”的比较。不像 `String` 类已经精心设计过，它重写了 `equals()` 方法，专门检查两个字符的序列内容是否完全一样。可以可以看到其是如何自定义原本默认函数的：

```java
class StringPair {
    String first, second;

    public StringPair(String first, String second) {
        this.first = first;
        this.second = second;
    }

    @Override
    public boolean equals(Object other) {
        // Make sure that other is a StringPair
        if (other instanceof StringPair) {
            StringPair otherPair = (StringPair) other; // Cast to StringPair
            // Use String .equals() to compare the two Strings
            return first.equals(otherPair.first) && second.equals(otherPair.second);
        }
        return false;
    }
}
```

第九行重写原方法签名

```java
@Override
// 重写父类（Object）的 equals 方法
public boolean equals(Object other) { 
// 接收任何类型的对象 other
```

检查 `other` 这个类属不属于 `StringPair` 类型或是其子类型，不是就返回 `false`

是的话将 `other` 从通用 `Object` 类型强制转换 (cast) 成 `StringPair` 类型

```java
// 把 other 从“任何东西”明确转换成“StringPair”类型
```

然后借用 `String` 类型的 `equals` 函数对比完成任务

```java
public class Equals { 
    // Notice how this will work regardless of which classes are really in the array 
    public static boolean allEqual(Object[] objects) { 
        if (objects.length == 0) { 
            return true; 
        } 
        Object first = objects[0]; 
        for (int i = 1; i < objects.length; i++) { 
            if (!first.equals(objects[i])) { 
                return false; 
            } 
        } 
        return true; 
    } 
    
    public static void main(String[] args) { 
        StringPair[] pairs = new StringPair[3]; 
        pairs[0] = new StringPair("Hello", "World"); 
        pairs[1] = new StringPair("Hello", "World"); 
        pairs[2] = new StringPair("Hello", "World"); 
        
        System.out.println(allEqual(pairs)); 
    } 
}
```

以上创造了一个函数叫 `allEqual` 一样借用 `String` 的相等方法完成任务

### The SDLC and Testing

SDLC 的第五步是 `Testing`

#### Unit Testing

- 单元测试是在软件开发过程中创建的自动测试
- 通常情况下，它们是唯一能让人相信你的代码能正常工作的好方法
- 有时候，人们会遵循一种叫做测试驱动开发的流程
- 首先写测试，然后写代码让这些测试通过
- 虽然软件开发的生命周期听起来可能有点抽象，但单元测试是非常实用的

JUnit 是早期主要的单元测试框架之一，它是为 Java 定制的，功能非常强大。我们可以在面向对象编程中单独测试每个类！针对不同语言有很多这样的框架。学习框架不是这门课程的范畴，尽管你应该知道它们的存在和使用。我们会用我们自己的（简单的）框架来做一个基本的单元测试介绍，并且在过程中会用到抽象和最终类。

##### SimpleUnitTest

```java
public abstract class SimpleUnitTest {
    public static final void assertTrue(boolean condition) {
        // See full code for details
        // Error if condition is false
    }

    public abstract void runAllTests();

    public static final void main(String[] args) {
        // See full code for details
        // Look for a class named arg[0]
        // If it is a subclass of SimpleUnitTest, call runAllTests()
    }
}
```

- `assertTrue()` 和 `main()` 是最终的，因为它们永远不需要被修改。
- `runAllTests()` 是抽象的，因为它必须被重写。

我们来测试一下之前提到的 `Expression` 类：

单独建立一个 `ExpressionTest.java` 

```java
public class ExpressionTest extends SimpleUnitTest {
    void testAddition() {
        assertTrue(new Add(new Value(1), new Value(1)).evaluate() == 2);
        assertTrue(new Add(new Value(1), new Value(2)).evaluate() == 3);
        assertTrue(new Add(new Value(3), new Value(-3)).evaluate() == 0);
    }

    void testMultiplication() {
        assertTrue(new Multiply(new Value(1), new Value(1)).evaluate() == 1);
        assertTrue(new Multiply(new Value(1), new Value(2)).evaluate() == 2);
        assertTrue(new Multiply(new Value(3), new Value(-3)).evaluate() == -9);
    }

    void testMixed() {
        assertTrue(new Add(new Multiply(new Value(1), new Value(1)), new Multiply(new Value(1), new Value(2)))
                .evaluate() == 3);
        assertTrue(new Multiply(new Add(new Value(1), new Value(2)), new Add(new Value(3), new Value(4)))
                .evaluate() == 21);
    }

    @Override
    public void runAllTests() {
        testAddition();
        testMultiplication();
        testMixed();
    }

    // 添加 main 方法以便直接运行
    public static void main(String[] args) {
        ExpressionTest tester = new ExpressionTest();
        tester.runAllTests();
    }
}
```

```shell
javac ExpressionTest.java SimpleUnitTest.java
java ExpressionTest
```

## Packages

要是好多程序员在一块儿搞个大项目，名字撞车是难免的。Java 允许两个类有不同的名字，只要它们在不同的 **namespace** 里就行。用包来解决问题，我们可以把一些相关的类放在一起，弄成包。到现在为止，咱们一直用的就是一个包：默认包。**每个包都是一个新命名空间。** 

- 包基本上就是一个命名空间里的类集合。
- 它封装了一组类。
- 就像是一个元级别的类。

要把一个类放在一个包里，你得做两件事儿：

第一，在 `.java` 文件顶部写上包名 `pkgname;`

第二，把类放在一个和包名一样的文件夹里：`/path/to/project/pkgname/`

```java
package pkga;

public class MyClass {
    public static void main(String[] args) {
        System.out.println("MyClass");
    }
}
```

假设你已经在你想存放项目的目录里：比如，`Lecture13/` 这个目录）

- 我们可以通过 `javac Lecture13/MyClass.java` 来编译 `MyClass`
- 我们可以通过 `java Lecture13.MyClass` 来运行它
- 我们用点来访问包里面的类

如果我们忘了写包名，就会出错了。 一般来说，目录名和包名得对得上

Java 会去对应的目录里找包，如果你的类不在那里，程序就会崩溃了。

如果项目有多层文件夹也可以继续重叠使用：

```java
package pkgb.subpackage1;

public class MyClass {
    public static void main(String[] args) {
        System.out.println("MyClass #2");
    }
}
```

### `import`

实习写代码过程中 Java 自动寻找同目录代码，子目录代码需要 `import`，`import` 别的路径的包也可以使用 `.` 语法

```java
import pkg.subpkg.etc;
```

现在举例：

```shell
Lecture13/
Lecture13/other directories...
Lecture13/vehicles/
Lecture13/vehicles/Bicycle.java
Lecture13/vehicles/Car.java
```

```java
import vehicles.Bicycle;
import vehicles.Car;
```

如果想直接一次性倒入完成：

```java
import vehicles.*
```

有时候可能需要组合：

```java
package pkgc;
import vehicles.*;
```

把代码放到 `pkgc` 目录里并不会改变 `import` 文件

- `import` 后面写的包名是**相对于整个项目环境的“绝对”名称**，**不是**相对于你当前所在的包`pkgc` 的“相对”位置。不能写成 `import ../vehicles.*;`

- `import` 语句告诉 Java 编译器和运行时（JVM）：“我需要用到名为 `vehicles` 的这个包。至于这个名为 `vehicles` 的包**具体在磁盘上的哪个位置**，是由你**启动程序的方式和类路径（Classpath）设置**来决定的。
- 你应该站在你项目的**最顶层目录**来执行 `java` 命令。Java 默认会从你执行 `java` 命令的那个目录开始，根据你提供的“包名.类名”（如 `pkgc.VehicleExample`）来查找对应的 `.class` 文件（查找 `pkgc` 文件夹下的 `VehicleExample.class`），它不会自动往上层目录查找

```shell
.
├── pkgA
│   ├── Provider.class
│   └── Provider.java
└── pkgB
    ├── Consumer.class
    └── Consumer.java
```

```java
package pkgB; // Declares this class belongs to the 'pkgB' package

// Import statement uses the 'absolute' package name 'pkgA'
// It doesn't matter that Consumer.java is in pkgB.
// We are telling Java: "Find the package named 'pkgA' relative to the classpath root".
import pkgA.Provider;

// Trying something like 'import ../pkgA.Provider;' would be a compile-time error.
// Java imports are not relative file paths.

public class Consumer {
    public static void main(String[] args) {
        System.out.println("Consumer starting in pkgB...");
        Provider myProvider = new Provider(); // Create an instance of the imported class
        myProvider.offerService(); // Use the imported class
        System.out.println("Consumer finishing in pkgB.");
    }
}
```

```java
package pkgA; // Declares this class belongs to the 'pkgA' package

public class Provider {
    public void offerService() {
        System.out.println("  -> Service offered by Provider in pkgA!");
    }
}
```

```shell
javac pkgB/Consumer.java
java pkgB/Consumer
```

虽然现代编译器自动完成了这些事

### The Classpath

- 我们运行 `Java` 程序的时候，它会找那些放在子目录里的包
- 每次 `Java` 看到 `import` 语句，它就会从当前目录开始，往对应的子目录里找
- 你还可以告诉 `Java` 去其他地方找包
- 它会检查在 `classpath` 里指定的所有目录
- 你可以修改 `classpath`

#### Java API

默认情况下 `classpath`自动搜索包含当前路径，也会搜索 Java API 

```java
import java.util.Scanner;
```

https://docs.oracle.com/en/java/javase/11/docs/api/java.base/module-summary.html

`java.lang` 包里头有 `String` 和 `Object` 这样的类被默认导入，和默认包里的所有东西一起自动导入。

#### Adding to the Classpath

如果我们想改换类路径，可以用这个 `--class-path` 标志

- 可以用冒号 `:` 分隔来指定多个目录
- `javac --class-path=path/to/package:path/to/other/package`.
- `java --class-path=path/to/package:path/to/other/package`
- 在 Windows 系统里，目录路径要用反斜杠
- 别忘了把当前目录也加上，`--class-path=some/path:.`
- 通常 IDE 会帮你处理这个，你也可以用同样的方法修改 `CLASSPATH` 环境变量

比如为了执行一个依赖两个不同目录的文件

```java
.
├── Lecture13
│   ├── ClasspathExample.java
│   ├── pkga
│   │   ├── MyClass.java
│   │   └── NoPackage.java
│   ├── pkgb
│   │   ├── subpackage1
│   │   │   └── MyClass.java
│   │   └── subpackage2
│   │       └── MyClass.java
│   ├── pkgc
│   │   └── VehicleExample.java
│   ├── VehicleExample.java
│   └── vehicles
│       ├── Bicycle.java
│       ├── Boat.java
│       ├── Car.java
│       ├── extra_vehicles
│       │   └── Kayak.java
│       └── MotorBoat.java
└── Lecture13_Extra
    └── pkgd
        └── Greeter.java
```

```java
javac --class-path=../Lecture13 Extra/:. ClasspathExample.java
java --class-path=../Lecture13 Extra/:. ClasspathExample
```

在 Lecture13 文件夹中，那么这样寻找自己当前目录下子包的同时还涵盖了另外一个文件夹的

另外包可以被编辑为 `.jar` 文件，也就是 Java Archive

https://docs.oracle.com/javase/tutorial/deployment/jar/basicsindex.html

一样可以被添加进 `classpath`

```shell
javac --class-path=path/to/mypackage.jar
```

### Packages and Access Modifiers

![image-20250503134121165](../assets/image-20250503134121165.png)

任何子类都可以访问受保护的成员，即使这个子类在另一个包里。

如果你想让人家能扩展你的类并且使用里面的成员，就把它设置为受保护的，否则就设置成默认

---

# 8.0 Exceptions, Interfaces

## Exceptions

拼写错误的变量名，访问数组越界 `java.lang.ArrayIndexOutOfBoundsException`

程序会 “抛出” 一个异常，我们可以“捕获”这个异常并处理它，防止程序崩溃

### Try Catch

```java
import java.util.Scanner;

public class ArrayTryCatch {
    public static void main(String[] args) {
        int[] a = { 882, 2, 11 };
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter index: ");
        int index = sc.nextInt();
        try {
            System.out.println(a[index]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Caught ArrayIndexOutOfBoundsException");
        }
    }
}
```

```java
try {
// some code
} catch (ExceptionType exception) {
// handle the exception
}
```

只要抓住数组越界这个错误类型，那么就打印错误到屏幕

- 代码第八行可以看到需要输入的是一个整数，那么可能抓不到 `InputMismatchException` 类型的错误，导致程序崩溃

```java
import java.util.Scanner;

import java.util.InputMismatchException;

public class ArrayTryCatch2 {
    public static void main(String[] args) {
        int[] a = { 882, 2, 11 };
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter index: ");
        try {
            int index = sc.nextInt();
            System.out.println(a[index]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Caught ArrayIndexOutOfBoundsException");
        } catch (InputMismatchException e) {
            System.out.println("Please enter a valid integer next time");
        }
    }
}
```

因此可以写多个 catch 捕捉

#### Exception Control Flow

```java
public class Example {

    // 工人 B 的工作：尝试做除法
    public static void workerB(int x) {
        System.out.println("Worker B starts working...");
        int result = 10 / x; // <--- 这里可能会出问题！
        System.out.println("Worker B calculated result: " + result);
        System.out.println("Worker B finished working.");
    }

    // 工头 A 的工作：让工人 B 去工作
    public static void workerA() {
        System.out.println("Worker A starts supervising...");
        workerB(0); // <--- 让 workerB 去做除以 0 的计算
        System.out.println("Worker A finished supervising.");
    }

    // 老板 main 的工作：让工头 A 去监督
    public static void main(String[] args) {
        System.out.println("Main starts the project...");
        workerA();
        System.out.println("Main finished the project.");
    }
}
```

- 系统发现这个 `ArithmeticException` 的异常对象抛出
- **`workerB` 在出错的那一行**立刻停止**执行。`System.out.println("Worker B calculated result: " + result);` 这一行及之后的代码**不会**被执行。

- 在 `workerB` 方法内部，出错的这行代码 `int result = 10 / x;` **没有**被放在 `try...catch` 块里。所以，`workerB` 方法**无法处理**这个异常，它**立即终止**了。

- 异常向上传递，传递给 14 行发现也没有 `try catch` 块异常处理也立即终止，异常继续向上传递，传给调用 `WorkA` 的方法也就是 `main` 最后发现还是没有异常处理块，因此这些打印语句均不会被执行都立即终止了，JVM 会**终止**整个程序的运行

想要解决这个问题在 A 处添加异常处理即可

```java
public class ExampleFixed {

    public static void workerB(int x) {
        System.out.println("Worker B starts working...");
        // 这行仍然可能抛出 ArithmeticException
        int result = 10 / x;
        System.out.println("Worker B calculated result: " + result);
        System.out.println("Worker B finished working.");
    }

    public static void workerA() {
        System.out.println("Worker A starts supervising...");
        try {
            // 把可能出错的调用放进 try 块
            workerB(0);
        } catch (ArithmeticException e) {
            // 如果 workerB 抛出了 ArithmeticException，这里会捕获它
            System.out.println("Worker A caught an issue: " + e.getMessage());
        }
        // 因为异常被 catch 处理了，程序会继续执行 catch 后面的代码
        System.out.println("Worker A finished supervising.");
    }

    public static void main(String[] args) {
        System.out.println("Main starts the project...");
        workerA(); // 调用 workerA
        System.out.println("Main finished the project."); // 这行现在会被执行了！
    }
}
```

#### Exceptions and Inheritance

我们需要去决定抓住错误后需要干些什么，有时候打印就够了，有时候需要要求重输入等

另外异常也像 “家族” 一样有继承关系

有一个最老的祖先，叫做 `Throwable` (代表所有能被抛出的问题)。其有两个分支

- `Error` 
  - 通常是 JVM 内部错误或资源耗尽等严重问题，程序一般没法处理，比如内存溢出 `OutOfMemoryError`。我们通常不 `catch` 这个
- `Exception` 下面又有好多分支（子类），把问题分类：
  - `IOException`
  - `RuntimeException`

因此 `catch (ExceptionType e)` 不仅能捕获正好是 `ExceptionType` 类型的异常，还能捕获所有 `ExceptionType` 的子类（或孙子类等后代）类型的异常。

- `catch (FileNotFoundException e)`：这是一个**小网眼的网**，专门用来捕捞“文件找不到”这种具体的鱼。
- `catch (IOException e)`：这是一个**中等网眼的网**，它可以捕捞“文件找不到”(`FileNotFoundException`) 这条鱼，也能捕捞其他各种 I/O 相关的鱼（比如 `SocketException`），因为它们都属于“IO鱼”这个大类。
- `catch (Exception e)`：这是一个**非常大的网**，几乎可以捕捞所有程序运行时可能遇到的、可处理的鱼（`IOException`, `RuntimeException` 及其所有子孙后代）。

`catch` 块利用了继承的多态性，既可以精确捕获特定类型的错误，也可以用一个 `catch` 块处理一类相关的错误。

### `throw()`

我们使用 `StringStack` 演示，`stack` 是最小的数据结构 FILO

```java
public class StringStack {
    private String[] data;
    private int top;
  
    public StringStack(int capacity) { ... }
    public void push(String s) { ... }
    public String pop() { ... }
}
```

#### `StringStack()`

```java
public StringStack(int capacity) {
    data = new String[capacity];
    top = 0;
}
```

构造函数用字符串组填充一定容量，`top` 代表 stack 顶部索引，随着 push 或 pop 会变动

#### `push()`

```java
public void push(String s) {
    if (top == data.length) {
        throw new RuntimeException("Stack is full");
    }
    data[top++] = s;
}
```

可以看到第三行 `throw` 写法防止堆栈空间已满，生成新的 `RuntimeException` 逻辑错误对象，第五行 stack 顶更新

#### `pop()`

```java
public String pop() {
    if (top == 0) {
        throw new RuntimeException("Stack is empty");
    }
    return data[--top];
}
```

第五行 stack 顶更新

#### RuntimeException

- 有两种异常：运行时异常和其他所有异常。
- 运行时异常可以导致程序崩溃，它代表了程序中的逻辑错误。
- 它们被称为“未检查异常”，因为你不必检查它们。
- 其他异常叫作 “已检查异常”，你必须用 `try-catch` 来检查它们。

<img src="../assets/image-20250503223948299.png" alt="image-20250503223948299" style="zoom:50%;" />

### Custom Exception

```java
public class StackFull extends Exception {
    public StackFull(String message) {
        super(message);
    }
}
```

这里是一个新的异常类，描述了我们的栈已满的情况

- 我们可以通过扩展 `Throwable` 或其子类来创建自己的异常
- 在大多数情况下，你应该只扩展 `Exception`、`RuntimeException` 或它们的子类
- `Exception` 通常用于可恢复的错误，而 `RuntimeException` 用于程序错误，`Error` 用于系统错误
- 对于我们的栈来说，`RuntimeException` 可能是一个更好的选择，但我们使用 `Exception` 来演示检查型异常

以下文件使用：

```java
public void push(String s) {
    if (top == data.length) {
        throw new StackFull("Stack can only hold " + data.length + "elements");
    }
    data[top++] = s;
}
```

自定义完毕后就可以使用，但是以上代码有一个问题，针对可能抛出受检异常的代码：

- 有些错误是“需要特别注意、必须提前处理或声明”的风险，比如文件找不到 (`IOException`)、数据库连接不上 (`SQLException`)，或者像我们这里定义的“栈满了”（`StackFull`）。这些就是受检异常。

- 要么使用 `try catch` 当场捕获，要么在方法签名上用 `throws` 关键字声明。警告调用者这个方法有抛出这种异常的风险
- `Unchecked Exception`，通常指 `RuntimeException` 及其子类，比如 `NullPointerException`, `ArrayIndexOutOfBoundsException`。Java 不强制你必须声明或捕获它们，因为它们通常被认为是编程逻辑错误

```java
public void push(String s) throws StackFull {
    if (top == data.length) {
        throw new StackFull("Stack can only hold " + data.length + "elements");
    }
    data[top++] = s;
}
```

- A comma-separated list can be used to throw multiple exceptions: `throws Exception1, Excpetion2`

那么实际使用过程中一旦调用该 `Checked Exception` 方法，Java 的规则是 “要么捕获，要么声明”。也就是说，调用者（这里是 `main` 方法）必须二选一：

- **捕获 (Catch):** 使用 `try...catch` 块把调用语句包起来，并在 `catch` 部分处理可能发生的 `StackFull` 异常。
- **声明 (Declare):** 在 `main` 方法自己的签名上也加上 `throws StackFull`，把处理这个异常的责任继续往上（最终会传给 JVM，导致程序可能因未捕获异常而终止）。

```java
public static void main(String[] args) {
    StringStack2 ss = new StringStack2(5);
    try {
        ss.push("Hello");
        ss.push("World");
        ss.push("!");
        ss.push("Hello");
        ss.push("World");
        ss.push("!");
    } catch (StackFull e) {
        System.out.println(e);
    }
}
```

这里就会继续执行，因为可以抓住 `StackFull` 异常

## Interfaces

Java 语言不允许类的多重继承。假设我们有两个已经存在的类，分别叫做 A 和 B。那么，如果我们想创建一个新的类 C，让它同时继承 A 和 B 的特性和功能，这是**不允许**的。你不能写像 `class C extends A, B { ... }` 这样的代码。在 Java 里，一个类最多只能直接继承 **一个** 父类 (`class C extends A` 是可以的)。

- 最主要的原因是为了**避免产生歧义和混淆**。如果允许一个类同时继承两个父类，可能会出现让编译器或运行时环境 “不知道该听谁的” 的尴尬情况。
  - 当你创建一个 C 的对象 `c`，然后调用 `c.doWork()` 时，程序应该执行 A 版本的 `doWork()` 还是 B 版本的 `doWork()` 呢？这就产生了**歧义**，不知道该选择哪个实现。如果类 A 有个变量 `name` (类型是 String)，类 B 也有个变量 `name` (类型可能是 int，或者也是 String 但访问权限不同)。

-  与其设计复杂的规则像 C++ 来解决上述的歧义问题，Java 直接禁用多重继承，改用了接口 Interface 解决该问题

---

- **An interface is like a class that only contains abstract methods**

接口可以理解为一种**纯粹的“合同”或“规范”**。它主要就是定义了一系列的方法签名（通常是抽象的，没有实现体），规定了实现这个接口的类**必须**提供这些方法的具体实现。（注：Java 8 之后接口可以有默认实现等，但核心概念仍是定义规范）。因为接口（传统上）只包含抽象方法，没有具体的实现代码，所以一个类实现多个接口时，就不会遇到前面说的“继承哪个实现”的歧义问题。

- `implements` 关键字：当一个类要遵守某个接口的规范时，我们用 `implements` 关键字，而不是 `extends`。

  -  一个类可以 `implements` **任意数量**的接口，用逗号隔开。例如 `class F implements B, C { ... }`，意味着 F 类承诺会实现 B 接口和 C 接口要求的所有方法。

  - 一个类可以**最多继承一个父类** (`extends`)，同时**实现任意多个接口** (`implements`)。例如 `class D extends A implements B { ... }`，意味着 D 继承了 A 的特性（可能包括一些具体实现），并且还承诺遵守 B 接口的规范。

- 如果接口 B 和接口 C 都要求一个 `doSomething()` 方法，实现它们的类 F 只需要提供**一个** `doSomething()` 的实现，就能同时满足两个接口的要求。

### Concepts

```java
public interface Example {
    void exampleMethod1(int param);
    double exampleMethod2(String s, int x);
}
```

可以看到定义接口和定义类很像，只是把 `class` 关键字换成了 `interface`。

- 一个公开的顶级接口应该放在与接口同名的 `.java` 文件里，顶级接口指的是直接定义在一个 `.java` 源文件的最外层、不嵌套在任何其他类或接口内部的接口。一个 `.java` 文件中可以有多个顶级类型（类或接口），但最多只能有一个是 `public` 的，并且文件名必须与这个 `public` 的顶级类型匹配。

  ```java
  // MyInterface.java 文件
  
  package com.example;
  
  // 这个 MyInterface 就是一个顶级接口
  public interface MyInterface {
      void methodA();
  }
  
  // 这个 MyHelperClass 就是一个顶级类 (可以在同一个文件，但只能有一个是 public)
  class MyHelperClass {
      // ...
  }
  ```

- 接口里的成员默认就是公开的，`Java 8` 之前默认抽象，就算不写关键字，非公开成员不符合接口理念

### HasLegs Example

```java
public interface HasLegs {
    int countLegs();
}
```

接口往往代表了一种契约，可以看到以下代码在实现的时候都有返回桌腿数，遵守了这一准则

```java
class Chair implements HasLegs {
    public int countLegs() {
        return 4;
    }
}

class Person implements HasLegs {
    public int countLegs() {
        return 2;
    }
}

class Spider implements HasLegs {
    public int countLegs() {
        return 8;
    }
}
```

-  这个 `HasLegs` 接口代表了“拥有可以被计数的腿”这样一种**概念或能力**。

- 接口通常就用来定义这种抽象的概念、能力、特征或扮演的角色（比如 Java 自带的 `Runnable` 表示“能跑的”，`Comparable` 表示“能比较的”）。

- **接口 (Interface)** 通常代表一种**概念、特征、能力或规范 (notion or trait)**。

- **类 (Class)** 通常代表一种具体的**事物或对象的类型 (type of thing)** （比如 `Dog`, `Table`, `Robot`）。

```java
public class CountLegs {
    public static void main(String[] args) {
        HasLegs[] things = new HasLegs[3];
        things[0] = new Chair();
        things[1] = new Person();
        things[2] = new Spider();
        int sum = 0;
        for (int i = 0; i < things.length; i++) {
            sum += things[i].countLegs();
        }
        System.out.println("Total number of legs: " + sum);
    }
}
```

`HasLegs[]` 可以看到接口可以被当作数组、变量一样使用，就像 Class 一样

### MakesSounds Example

```java
public interface MakesSounds {
    String sound();
}
```

```java
abstract class Insect implements HasLegs {
    @Override
    public int countLegs() {
        return 6;
    }
}
// 抽象类实现了 HasLegs 接口后覆写默认昆虫有六条腿

class Cricket extends Insect implements MakesSounds {
    @Override
    public String sound() {
        return "Chirp";
    }
}
// 获得方法，实现 sound 具体细节

class SqueakyChair implements HasLegs, MakesSounds {
    @Override
    public int countLegs() {
        return 4;
    }

    @Override
    public String sound() {
        return "Squeak";
    }
}
// 实现多接口
```

```java
public class SoundExample {
    public static void main(String[] args) {
        MakesSounds[] things = { new Cricket(), new SqueakyChair() };
        for (MakesSounds thing : things)
            System.out.println(thing.sound());
        HasLegs[] legs = { new Cricket(), new SqueakyChair() };
        for (HasLegs leg : legs)
            System.out.println(leg.countLegs());
    }
}
```

可以看到  `MakeSounds[]` 以及 `HasLegs[]` 直接把接口分别当数组储存其具有相关特性的类使用，然后分别打印其功能，体现了多态性，当然为了用户更方便实现，可以在接口层就直接实现接口继承：

```java
public interface HasLegsAndMakesSounds extends HasLegs, MakesSounds {
    // This interface has no methods of its own.
    // It inherits the methods from its two parent interfaces.
}
```

- 可以看到接口也可以继承接口，多接口直接把两个特性提前结合，这样在实现的时候就可以直接将这快速实现同时具备这两种特性的类

```java
abstract class Insect implements HasLegs {
    @Override
    public int countLegs() {
        return 6;
    }
}

class Cricket extends Insect implements HasLegsAndMakesSounds {
    @Override
    public String sound() {
        return "Chirp";
    }
}

class SqueakyChair implements HasLegsAndMakesSounds {
    @Override
    public int countLegs() {
        return 4;
    }

    @Override
    public String sound() {
        return "Squeak";
    }
}
```

```java
public class LegsAndSoundsExample {
    public static void main(String[] args) {
        HasLegsAndMakesSounds[] things = { new Cricket(), new SqueakyChair() };
        for (HasLegsAndMakesSounds thing : things) {
            System.out.println(thing.sound());
            System.out.println(thing.countLegs());
        }
    }
}
```

### Interface variables

- **接口可以定义变量（常量）：** 接口内部可以定义变量。但要特别注意，接口中定义的任何变量**默认都是** `public static final` 的。但是在接口处定义常量是及其少见的，同名常量会直接导致编译错误，接口的主要目的是定义行为而不是储存常量

```java
interface A {
    int x = 1;
}

interface B {
    double x = 2.0;
}

interface C extends A, B {
    // What's the type of C.x?
}

public class DuplicateFields {
    public static void main(String[] args) {
        System.out.println(C.x);
    }
}
```

### `default`

`Java 8` 之前接口中只能包含抽象方法没有方法体和常量的概念，所有接口的类必须提供接口中所有抽象方法的具体实现。

```java
interface HasId {
    default int getId() {
        return 0;
    }

    public class Admin implements HasId {
        // No need to override getId()
    }
}
```

第二行提供了默认方法

- **可能导致多重继承错误：** 如果一个类实现了两个不同的接口，而这两个接口恰好都提供了**同名同参数**的默认方法，那么这个类就必须**自己重写**这个方法来明确指定到底使用哪个实现或者提供一个全新的实现，否则就会产生编译错误。这使得默认方法虽然灵活，但也需要谨慎使用，通常用于特定场景（如向后兼容地给接口添加新功能）。

这个考试不考

### Stack Interface 

使用接口实现堆栈概念

```java
public interface StringStack {
    String pop();
    void push(String s);
    boolean isEmpty();
}
```

```java
public class ArrayStringStack implements StringStack {
    private String[] stack;

    public ArrayStringStack() {
        stack = new String[0];
    }

    @Override
    public String pop() {
        // removes this.stack[0] and returns it
    }

    @Override
    public void push(String s) {
        // Resizes this.stack with s at position 0
    }

    @Override
    public boolean isEmpty() {
        return stack.length == 0;
    }
}
```

这一段使用 Array 实现，很有可能明天要考

```java
public interface StringStack {
    String pop();
    void push(String s);
    boolean isEmpty();
}

public class ArrayStringStack implements StringStack {

    private String[] stack;

    public ArrayStringStack() {
        stack = new String[0];
    }

    @Override
    public String pop() {
        if (isEmpty()) {
            throw new RuntimeException("Cannot pop from an empty stack.");
        }
        String topElement = stack[0];
        String[] newStack = new String[stack.length - 1];
        System.arraycopy(this.stack, 1, newStack, 0, newStack.length);
        this.stack = newStack;
        return topElement;
    }

    @Override
    public void push(String s) {
        String[] newStack = new String[stack.length + 1];
        newStack[0] = s;
        System.arraycopy(this.stack, 0, newStack, 1, this.stack.length);
        this.stack = newStack;
    }

    @Override
    public boolean isEmpty() {
        return stack.length == 0;
    }

    @Override
    public String toString() {
        if (isEmpty()) {
            return "Stack (top=empty): []";
        }
        // Manually build the string representation
        StringBuilder sb = new StringBuilder();
        sb.append("Stack (top=");
        sb.append(stack[0]);
        sb.append("): [");
        sb.append(stack[0]);
        for (int i = 1; i < stack.length; i++) {
            sb.append(", ");
            sb.append(stack[i]);
        }
        sb.append("]");
        return sb.toString();
    }
```

可以看到第四十行改写了 `Object.toString`

### Collections

Java 提供了一套标准的框架来存储和管理**一组对象**（就像一个“集合”）。这就是 Java 集合框架。

Java 集合框架使用接口（如 `Collection`, `List`, `Set`, `Queue`, `Deque`）来定义不同类型集合的规范。

框架中没有专门的 `Stack` 接口，但功能更强大的 `Deque`（双端队列）接口可以完美地用作栈。推荐使用 `ArrayDeque` 类作为栈的实现。

Java 中有一个历史遗留的 `java.util.Stack` **类**，但因其设计问题和过时，不推荐在新代码中使用。

```java
import java.util.List;          // List 接口
import java.util.ArrayList;     // ArrayList 类 (实现 List)
import java.util.Set;           // Set 接口
import java.util.HashSet;       // HashSet 类 (实现 Set)
import java.util.Map;           // Map 接口
import java.util.HashMap;       // HashMap 类 (实现 Map)
import java.util.Deque;         // Deque 接口 (可作为栈使用)
import java.util.ArrayDeque;    // ArrayDeque 类 (实现 Deque)
import java.util.Iterator;      // 用于迭代器遍历
```

---

# 9.0 Enums, Generic, SOLID

## Enums

### Concepts

编程当中固定以及有限的值直接用整数表示有缺点，比如 1 到底是周一还是周日：类型不安全、含义不明确、维护困难，因此可以使用枚举

```java
// 定义一个表示星期的枚举类型
enum DayOfWeek {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}
// 定义一个表示交通方式的枚举类型
enum Transport {
    BUS, TRAIN, FERRY, TRAM
}
```

- 枚举常量名通常使用全大写字母 s
- `枚举名.常量名` 的方式来访问具体的值。**注意：不使用 `new` 关键字**

```java
DayOfWeek today = DayOfWeek.MONDAY;
Transport myTransport = Transport.BUS;
```

这样可读性较强也可以使用 `==` 比较

- Java 中的 `enum` 实际上是一种特殊的类
- 所有枚举都隐式地继承自 `java.lang.Enum` 类
- 不能再继承其他类，也不能被其他类继承
- 可以像类一样拥有访问修饰符`public, protected, private`

以及其和 `switch` 语句也可以结合的比较好

```java
public static int typicalSpeed(Transport transport) {
    switch (transport) {
        case BUS:
            return 50;
        case TRAIN:
            return 100;
        case FERRY:
            return 20;
        case TRAM:
            return 30;
        default:
            return 0;
    }
}

public static boolean isWeekend(DayOfWeek day) {
    return day == DayOfWeek.Saturday || day == DayOfWeek.Sunday;
}

public static void main(String[] args) {
    DayOfWeek day = DayOfWeek.Monday;
    System.out.println(isWeekend(day));
    System.out.println(isWeekend(DayOfWeek.Saturday));
    System.out.println(typicalSpeed(Transport.BUS));
    System.out.println(typicalSpeed(Transport.TRAIN));
}
```

### Functions

- `values()`

枚举含有内置方法，`values()` 静态方法，返回一个包含该枚举所有常量的数组

```java
for (DayOfWeek day : DayOfWeek.values()) {
    System.out.println(day);
}
```

- `ordinal()`: 返回枚举常量在声明时的**序号**（从 0 开始）。例如 `DayOfWeek.MONDAY.ordinal()` 返回 0

- `valueOf(String name)`: **静态方法**，根据给定的名称字符串返回对应的枚举常量

枚举类可以添加自己的方法，也可以添加自己的构造函数以及字段，构造器默认必须 `private` 可以不写，不能使用 `new`，`JVM` 会在创建枚举常量实例时自动调用。

```java
enum Transport {
    BUS(50), TRAIN(100), FERRY(20), TRAM(30); // 调用构造器

    private final int typicalSpeed; // 添加字段

    Transport(int typicalSpeed) { // 构造器 (隐式 private)
        this.typicalSpeed = typicalSpeed;
    }

    public int getTypicalSpeed() { // 添加方法
        return typicalSpeed;
    }
}
// 使用: Transport.BUS.getTypicalSpeed() 返回 50
```

可以通过这种方式直接在内部写好值就不用写 `switch` 语句

## Autoboxing and Unboxing

Java 为每个**基本数据类型** (primitive type: `int`, `double`, `boolean`, `char` 等) 都提供了一个对应的**包装类** (wrapper class: `Integer`, `Double`, `Boolean`, `Character` 等)。这些包装类是对象。

- **自动装箱 (Autoboxing):** 

  Java 编译器自动地将基本数据类型的值转换为对应的包装类对象。

- **自动拆箱 (Unboxing):** 

  Java 编译器自动地将包装类对象转换为对应的基本数据类型的值。

### Usage

- 赋值

```java
Integer wrapperInt = 10;       // Autoboxing: int 10 -> Integer(10)
int primitiveInt = wrapperInt; // Unboxing: Integer(10) -> int 10
```

- 泛型集合

```java
List<Integer> list = new ArrayList<>();
list.add(1); // Autoboxing: int 1 -> Integer(1)
int first = list.get(0); // Unboxing: Integer(1) -> int 1
```

`ArrayList` 这种只能储存对象不能直接储存基本数据类型用这种方法传入

- 方法调用：类型自动转换

```java
// 方法期望 int，传入 Integer -> 自动拆箱
public static int sum(int a, int b) { return a + b; }
Integer x = 1, y = 2;
int result = sum(x, y);

// 方法期望 Double，传入 double -> 自动装箱
public static Double max(Double a, Double b) { return a > b ? a : b; }
Double maxVal = max(1.0, 2.0);
```

- 运算：自动拆箱成基本类型再计算

```java
Integer a = 1;
Integer b = 2;
Integer c = a + b; // a, b 拆箱成 int，相加后结果 3 再装箱成 Integer 赋给 c
```

### Problems

- **reference**

  自动装箱/拆箱创建的是不同的对象（或从缓存获取）。它不能用来像对象引用那样共享对原始基本类型值的修改。

  ```java 
  Integer a = 1;
  Integer b = a; // b 指向和 a 相同的 Integer 对象 (对于小数值，通常是缓存的)
  a += 2;       // 实际是: a = Integer.valueOf(a.intValue() + 2); a 指向了新的 Integer(3) 对象
  System.out.println(a); // 3
  System.out.println(b); // 1 (b 仍然指向原来的 Integer(1) 对象)
  ```

- **performance**

  设计到对象的创建和转换，相比直接使用基本数据类型会有一定数据开销：时间与空间

- **`NullPointerException`：** 

  如果一个包装类变量的值是 `null`，在自动拆箱时会抛出 `NullPointerException`。

  ```java
  Integer i = null;
  int j = i; // 尝试拆箱 null，会抛出 NullPointerException
  ```

使用包装类/自动装箱

- 当需要将基本类型值存入只能存储对象的集合类时（如 `ArrayList<Integer>`）。
- 当需要使用基本类型值作为泛型类型参数时。
- 当需要调用需要对象参数的方法时。
- 当需要使用包装类提供的静态工具方法或常量时。

### Wrapper Class Utilities

包装类提供了静态方法与常量

**数值类型 (`Integer`, `Long`, `Double`, `Float` 等):**

- **字符串转换:** `Integer.parseInt("123")`, `Double.parseDouble("3.14")` (注意可能抛出 `NumberFormatException`)。
- **数值范围:** `Integer.MAX_VALUE`, `Integer.MIN_VALUE`, `Double.POSITIVE_INFINITY`, `Double.NaN` 等。
- **进制转换/位运算:** `Integer.toBinaryString(10)`, `Integer.highestOneBit(10)` 等。

**`Character`:**

- **字符判断:** `Character.isDigit('1')`, `Character.isLetter('a')`, `Character.isUpperCase('A')`, `Character.isWhitespace(' ')` 等。
- **大小写转换:** `Character.toUpperCase('a')`, `Character.toLowerCase('Z')`。

## Generics

想象一下，我们想创建一个栈（Stack）数据结构。如果我们为 `String` 类型写一个 `StringStack` ，那么当我们想存 `int` 或者其他类型时，就需要重写整个类 。这非常低效。

- 一个方法是使用 `Object` 类来创建 `ObjectStack`结合 Autoboxing 以及 Unboxing 特性，甚至可以储存原始类型，但是取出数据的时候需要强制类型转换：`int three = (Integer) ss.pop();`

- 如果在 `pop` 时转换的类型与存入时的类型不匹配，程序不会在编译时报错，而是在运行时抛出 `ClassCastException` 错误 。这相当于丢失了 Java 强大的类型检查功能 。  

而泛型可以更好地解决这个问题：在类名后面加上 `<T>` 这里的 T 就是类型参数 Type Parameter，他是一个占位符代表某种具体的类型，因此可以用任何合法标识代替 T

```java
public class GenericStack<T> {
    public GenericStack(int capacity) { ... }
    public void push(T s) { ... } // 方法参数使用类型参数 T
    public T pop() { ... }         // 返回值使用类型参数 T
}
```

那么在实例化的时候需要为其指定一个具体的类型参数如 Integer 或 String

```java
GenericStack<Integer> intStack = new GenericStack<Integer>(5); // T 被指定为 Integer
intStack.push(3); // OK
// intStack.push("Hello"); // 编译时错误！类型不匹配
int value = intStack.pop(); // 不需要强制类型转换
```

- 使用 generics 在编译时会检查类型是否匹配，避免了运行时的 `ClassCastException`
- 只需写一次 `GenericStack<T>` 就可以用于任何非原始类型
- 无需强制转换

类型参数必须是类类型，不能是原始类型（如 int）。但由于自动装箱/拆箱，使用原始类型通常没有障碍 。   

### Multiple Generics Parameters

```java
public class GenericPair<T, V> {
    public T first;
    public V second;
    public GenericPair(T first, V second) {
        this.first = first;
        this.second = second;
    }
}
```

泛型类可以有多个类型参数，用逗号分隔。

```java
// 创建一个存储 <Integer, String> 对的 ArrayList
var studentList = new ArrayList<GenericPair<Integer, String>>();
studentList.add(new GenericPair<Integer, String>(10243549, "Alan Turing"));
```

第二行出现了 `var` 关键词，是 Java 10 引入的一个关键字

- 用于**局部变量类型推断 Local Variable Type Inference**

```java
// 原本需要这样写，类型名称很长:
ArrayList<GenericPair<Integer, String>> studentList = new ArrayList<GenericPair<Integer, String>>();
```

用 `var`替代后编译器可以自动从右边推断出左边减少冗余，只能用于局部变量

### Bounded Type Parameters

有时我们希望限制可以用作类型参数的类型范围。使用 `extends` 关键字，例如 `<T extends SuperClass>`。这表示 `T` 必须是 `SuperClass` 本身或者是它的子类 。`SuperClass` 就是这个类型参数的**上界 (Upper Bound)** 。 

```java
abstract class Bird { }
class Emu extends Bird { }
class Hawk extends Bird { }

class BirdPair<T extends Bird> { // T 必须是 Bird 或其子类
    public T first;
    public T second;
    public BirdPair (T first, T second) { ... }
}
```

```java
var emuPair = new BirdPair<Emu>(new Emu(), new Emu()); // OK
var hawkPair = new BirdPair<Hawk>(new Hawk(), new Hawk()); // OK
var birdPair = new BirdPair<Bird>(new Emu(), new Hawk()); // OK
// var badPair = new BirdPair<String>("Hello", "World"); // 编译时错误！String 不是 Bird 的子类
```

`<T>` 实际上等价于 `<T extends Object>`，因为所有类都继承自 `Object` 

### Generic Interfaces

接口也可以是泛型的，拥有类型参数，类型参数可以用在接口的方法签名中。`Comparable<T>`就是一个泛型接口，它要求实现 `compareTo(To)` 方法，用于比较当前对象和另一个 `T` 类型的对象

#### With bounded type parameters

```java
public class RunningMaximum<T extends Comparable<T>> { // T 必须实现 Comparable<T>
    private T currentMax;
    public RunningMaximum (T initial) { currentMax = initial; }
    public void addNumber (T number) {
        if (number.compareTo(currentMax) > 0) { // 调用 compareTo 方法
            currentMax = number;
        }
    }
    public T getCurrentMax() { return currentMax; }
}
```

- 可以将泛型接口用作有界类型参数的边界。
- 可以用于任何实现了 `Comparable` 的类型，如 `Integer`, `String` 等

```java
RunningMaximum<Integer> runningMax = new RunningMaximum<>(1); // 使用 Integer
runningMax.addNumber(5);
System.out.println(runningMax.getCurrentMax()); // 输出 5
```

实现过程中第一行在 `Java 7`之前你必须这样写：

```java 
RunningMaximum<Integer> runningMax = new RunningMaximum<Integer>(1);
// ^^^^^^^^^^^^^^^^^^^             ^^^^^^^^^^^^^^^^^^^^^^^^^^^
// (类型声明)                        (构造函数调用时指定类型)
```

**Java 7 及之后**: 引入了菱形运算符 `<>`。如果你在左侧显式声明了类型 `RunningMaximum<Integer> runningMax`，编译器就可以从左侧推断出右侧的泛型类型，所以你可以写成 `RunningMaximum<Integer> runningMax = new RunningMaximum<>(1);`，右侧 `<>` 中无需重复类型。

**Java 10 及之后**: 引入了 `var`。如果你在右侧的初始化表达式中提供了足够的信息让编译器推断出类型例如 `new RunningMaximum<>(1)`，其中 `1` 是 `Integer`，**如果构造函数接受 T 类型参数，编译器就能推断出 T 是 Integer**，你就可以结合 `var` 和菱形运算符写成：

```java 
var runningMax = new RunningMaximum<>(1);
```

### Generic Methods

方法也可以独立于类定义自己的类型参数

类型参数列表放在修饰符（如 `public static`）之后，返回类型之前。

```java
public class GenericMax {
    // 定义了一个类型参数 T，它必须实现 Comparable<T>
    public static <T extends Comparable<T>> T max(T a, T b) {
        if (a.compareTo(b) > 0) {
            return a;
        } else {
            return b;
        }
    }
}
```

`T` 的具体含义是跟**对象**绑定的，而静态方法属于**类**，不属于任何特定的对象。因为静态方法不与任何特定对象关联，所以它无法知道当前上下文中 `T` 应该代表哪个具体类型。因此当你需要在静态方法中使用泛型时，你不能使用**类**定义的类型参数（如 `T`）。相反，你需要定义一个**泛型静态方法**，它有自己独立的类型参数。

### Type Erasure

Java 中的泛型主要是**编译时**的特性。在编译代码时，编译器会检查泛型的类型安全性，编译完成后，所有的泛型类型信息都会被**擦除 (erased)** 。类型参数（如 `T`）在字节码中会被替换成它们的边界。编译器会在需要的地方自动插入强制类型转换，以保证运行时逻辑的正确性 。类型擦除是 Java 泛型实现的一种方式，但它会导致一些限制和“陷阱” (sharp edges)。

- 不能创建类型参数的实例 如 `new T()`

- 不能创建泛型数组 (如 `new T[100]`)

- 不能对带有参数化类型的对象使用 `instanceof` 检查 (如 `obj instanceof ArrayList<String>`)

- 擦除后方法签名相同会造成歧义

  **Method Signature**：在 Java 中，一个方法的签名主要由它的**方法名**和**参数类型列表**组成。

  ```java
  public class MyGenericClass<T, V> {
  
      public void process(T data) {
          System.out.println("Processing T: " + data);
      }
  
      public void process(V data) { // 看起来和上面那个不同
          System.out.println("Processing V: " + data);
      }
  }
  ```

  擦除后都变成了 `process(Objec data)` 编译阶段就会报错

## SOLID

**“Clean Code” by Robert Martin**

Robert Martin 给 OOP 代码规范提出了原则，主要是为了让代码容易理解、灵活、可重用、易于维护，让你感觉像是个“真正的”工程师

### Single Responsibility Principle - SRP

-  一个类应该只有一个引起它变化的原因 。这意味着一个类应该只承担一项职责，或者说只做一件事情 。 这使得代码更容易测试和维护 。如果一个类只做一件事，那么思考如何使用和测试它会更容易 。

例如，将文件读取、写入和压缩的功能分散到`FileReader`、`FileWriter`和`FileCompressor`三个不同的类中，而不是放在一个`FileManager`类里，就是遵循SRP的例子 。同样，将迷宫数据的管理（`Grid`类）和路径查找（`MazeSolver`类）分开也是SRP的应用 。

### Open-Closed Principle - OCP

软件实体（如类、模块、函数等）应该**对扩展开放，对修改关闭** 。这意味着我们应该能够通过添加新代码（如新类或新方法）来增加新功能，而不是修改现有代码 。

- 因此鼓励使用接口和抽象类，降低在添加新功能时引入错误的风险 。

通过计算图形面积的例子说明，使用 `Shape` 接口，并让 `Circle` 和 `Square` 类实现该接口来计算各自的面积，比在一个 `AreaCalculator` 类中使用 `if-else` 判断形状类型来计算面积要好 。添加新形状（如三角形）时，只需创建一个新的实现 `Shape` 接口的类，而无需修改现有代码 。   

```java
public enum ShapeType {
    CIRCLE, SQUARE
}

public class Shape {
    public ShapeType type;
    public double radius; // for Circle
    public double side; // for Square
}

public class AreaCalculator {
    public double area(Shape shape) {
        if (shape.type == ShapeType.CIRCLE) {
            return Math.PI * shape.radius * shape.radius;
        } else if (shape.type == ShapeType.SQUARE) {
            return shape.side * shape.side;
        }
        return 0;
    }
}
```

以上这样的程序一旦出现新的 Shape 就不得不修改 `AreaCalculator` 类

```java
public interface Shape {
    double area();
}

class Circle implements Shape {
    private double radius;

    public double area() {
        return Math.PI * radius * radius;
    }
}

class Square implements Shape {
    private double side;

    public double area() {
        return side * side;
    }
}
```

我们应该做的是利用接口制定准则，这一块是 `open` 的，但 `implements` 是 `close` 的

### Liskov Substitution Principle - LSP

里氏替换原则：一个子类应该能装作自己是它的父类，而不会弄坏什么东西。

- 这鼓励了正确的继承和多态性。

- 确保新的派生类不会带来意外的行为。

```java
class Bird {
    void fly() {
    }
}

class Penguin extends Bird {
    @Override
    void fly() {
        throw new UnsupportedOperationException("Penguins can't fly");
    }
}
```

以上这样的程序违反了 `LSP`因为直接修改了 `fly` 的方法，这样如果让企鹅替代鸟类使用就会出现错误，企鹅不会飞

```java
abstract class Bird {
    abstract void move();
}

class FlyingBird extends Bird {
    @Override
    void move() {
        fly();
    }

    void fly() { ... }
}

class NonFlyingBird extends Bird {
    @Override
    void move() {
        walk();
    }

    void walk() { ... }
}
```

因此我们使用更抽象思想派生出会飞与不会飞两个抽象类型

以及用 `function` 互相调用的方式最小化影响

你觉得电动人造鸭看起来像鸭子抽象为鸭，但是前者需要电池，那就是错误抽象

### Interface Segregation Principle - ISP

接口隔离原则

- 客户端不应该被强迫依赖它们不使用的方法 。也就是说，使用多个专门的小接口通常比使用一个庞大臃肿的接口要好，这样可以提高代码的可维护性和可读性 

```java
public class GameEntity {
    public Model3D getModel() { ... }

    public Point3D getPosition() { ... }

    public int getHP() { ... }

    public int getAttack() { ... }
}

class Renderer {
    public void render(GameEntity entity) {
        // We don't care about getHP() and getAttack()
    }
}
```

比如上述代码中，游戏开发商继承游戏实体后需要开发一个渲染类，这个渲染类不需要血量和攻击力参数，就造成了内存浪费，所以从设计之初就要考虑到使用的小抽象接口：

```java
interface Renderable {
    Model3D getModel();

    Point3D getPosition();
}

interface Fighter {
    int getHP();

    int getAttack();
}

public class GameEntity implements Renderable, Fighter {
    public Model3D getModel() { ... }

    public Point3D getPosition() { ... }

    public int getHP() { ... }

    public int getAttack() { ... }
}

class Renderer {
    public void render(Renderable entity) {
        // Much better
    }
}
```

用接口实现可渲染、有战士这两个准则

这样 `Renderer` 类就可以只依赖于 `Renderable` 接口

### Dependency Inversion Principle - DIP

依赖倒置原则

- 高层模块不应该依赖于低层模块，两者都应该依赖于抽象 。抽象不应该依赖于细节，细节应该依赖于抽象 。简单来说，要面向接口编程，而不是面向实现编程 。

这样使代码更加灵活。如果改变了一个具体类的实现，不需要检查所有依赖它的类 。

```java
class EmailService {
    void sendEmail(String message, String recipient) { ... }
}

class Notification {
    EmailService emailService;

    void sendNotification(String message, String recipient) {
        emailService.sendEmail(message, recipient);
    }
}
```

可以看到 `Notification` 直接依赖于 `EmailService` 而不是接口，正确实现应该是

```java
interface MessageService {
    void sendMessage(String message, String recipient);
}

class EmailService implements MessageService {
    @Override
    public void sendMessage(String message, String recipient) {
        // Not real code
    }
}

public class Notification {
    MessageService messageService;

    void sendNotification(String message, String recipient) {
        // Now we can change the message service whenever we want
        // Depending on an interface is better than depending on a class
        messageService.sendMessage(message, recipient);
    }
}
```

将来如果需要短信通知服务再实现一个 `MessageService` 就行，其他类不需要被更改

## Labs

- 5. `ArrayList` 数据库跟踪每门课程中的学生数量

```java
import java.util.ArrayList;

class StudentCourse {
    String studentName;
    String courseName;

    public StudentCourse(String student, String course) {
        this.studentName = student;
        this.courseName = course;
    }

    public String getStudentName() {
        return studentName;
    }

    public String getCourseName() {
        return courseName;
    }
}

public class ClassDatabase {

    private ArrayList<StudentCourse> enrollments;

    public ClassDatabase() {
        this.enrollments = new ArrayList<>();
    }

    public void addCourseStudent(String student, String course) {
        StudentCourse newEntry = new StudentCourse(student, course);
        this.enrollments.add(newEntry);
    }

    public int countStudents(String course) {
        int count = 0;
        for (StudentCourse entry : this.enrollments) {
            if (entry.getCourseName().equals(course)) {
                count++;
            }
        }
        return count;
    }

    public static void main(String[] args) {
        ClassDatabase db = new ClassDatabase();
        db.addCourseStudent("Alan Turing", "CITS2005");
        db.addCourseStudent("Alan Turing", "CITS2200");
        db.addCourseStudent("Max", "CITS9999");
        db.addCourseStudent("Gozz", "CITS9999");
        db.addCourseStudent("Jane Doe", "CITS2005");

        System.out.println(db.countStudents("CITS2005"));
        System.out.println(db.countStudents("CITS2200"));
        System.out.println(db.countStudents("CITS9999"));
        System.out.println(db.countStudents("CITS1001"));
    }
}
```

- 5. `StringAPI`

```java
public class WordTools {

    public static boolean isWord(String input) {
        if (input == null || input.isEmpty()) {
            return false;
        }
        for (char c : input.toCharArray()) {
            if (!Character.isLetter(c)) {
                return false;
            }
        }
        return true;
    }

    public static boolean isLowerCaseWord(String input) {
        if (input == null || input.isEmpty()) {
            return false;
        }
        for (char c : input.toCharArray()) {
            if (!Character.isLowerCase(c)) {
                return false;
            }
        }
        return true;
    }

    public static boolean isUpperCaseWord(String input) {
        if (input == null || input.isEmpty()) {
            return false;
        }
        for (char c : input.toCharArray()) {
            if (!Character.isUpperCase(c)) {
                return false;
            }
        }
        return true;
    }

    public static boolean isSarcasmCaseWord(String input) {
        if (!isWord(input)) {
            return false;
        }
        if (input.length() <= 1) {
            return true;
        }
        for (int i = 1; i < input.length(); i++) {
            char previousChar = input.charAt(i - 1);
            char currentChar = input.charAt(i);
            boolean isPreviousUpper = Character.isUpperCase(previousChar);
            boolean isCurrentUpper = Character.isUpperCase(currentChar);
            if (isPreviousUpper == isCurrentUpper) {
                return false;
            }
        }
        return true;
    }
```

- 5. Overload `MyString` 方法

```java
public class MyString {
    private char[] chars;

    public MyString(char[] chars) {
        this.chars = new char[chars.length];
        for (int i = 0; i < chars.length; i++) {
            this.chars[i] = chars[i];
        }
    }

    public char charAt(int index) {
        return chars[index];
    }

    public int length() {
        return chars.length;
    }

    public boolean equals(MyString s) {
        if (length() != s.length())
            return false;
        for (int i = 0; i < length(); i++) {
            if (charAt(i) != s.charAt(i))
                return false;
        }
        return true;
    }

    public MyString substring(int start, int end) {
        char[] newChars = new char[end - start];
        for (int i = start; i < end; i++) {
            newChars[i - start] = chars[i];
        }
        return new MyString(newChars);
    }

    public MyString concatenate(MyString s) {
        char[] newChars = new char[chars.length + s.length()];
        for (int i = 0; i < chars.length; i++)
            newChars[i] = chars[i];
        for (int i = 0; i < s.length(); i++)
            newChars[chars.length + i] = s.charAt(i);
        return new MyString(newChars);
    }
}
```

- `“boolean equals（String s）”`，适用于普通的 Java 字符串
- `“MyString substring（int start）”`，返回从 “start” 到字符串末尾的子字符串。您可以使用现有的 substring 方法来编写更短的代码吗？
- `“MyString concatenate（char c）”，`连接单个字符

```java
public boolean equals(String s) {
    if (s == null) { 
        return false;
    }
    if (this.length() != s.length()) { 
        return false;
    }
    for (int i = 0; i < this.length(); i++) {
        if (this.charAt(i) != s.charAt(i)) {
            return false;
        }
    }
    return true;
}

public MyString substring(int start) {
    if (start < 0 || start > this.length()) {
       throw new StringIndexOutOfBoundsException("Invalid starting index: " + start + " (The string length is: " + this.length() + ")");
    }
    // 调用现有的 substring 方法，结束索引是字符串的长度
    return this.substring(start, this.length());
}

public MyString concatenate(char c) {
    char[] charAsArray = { c };
    MyString charAsMyString = new MyString(charAsArray);
    return this.concatenate(charAsMyString);
}
```

- 6. `ParticleCollider`

```java
import java.util.Arrays;

abstract class Particle {
    public abstract Particle collide(Particle other);

    @Override
    public String toString() {
        return this.getClass().getSimpleName();
    }
}

abstract class Xapper extends Particle {
}

abstract class Zipper extends Particle {
}

class ParticleA extends Xapper {
    @Override
    public Particle collide(Particle other) {
        if (other instanceof Xapper) {
            return new ParticleA();
        } else {
            return new ParticleB();
        }
    }
}

class ParticleB extends Xapper {
    @Override
    public Particle collide(Particle other) {
        if (other instanceof Zipper) {
            return new ParticleC();
        } else {
            return new ParticleA();
        }
    }
}

class ParticleC extends Zipper {
    @Override
    public Particle collide(Particle other) {
        if (other instanceof ParticleA) {
            return new ParticleC();
        } else {
            return new ParticleD();
        }
    }
}

class ParticleD extends Zipper {
    @Override
    public Particle collide(Particle other) {
        if (other instanceof Zipper) {
            return new ParticleC();
        } else {
            return new ParticleA();
        }
    }
}
```

- 7. `Maze`

```md
YourProjectFolder/
├── MazeSolver.java
└── maze/
    ├── Maze.java
    ├── MazeBoundsException.java
    └── RandomMaze.java
```

走迷宫, `#` 代表墙, `x` 代表走过路径

```java
 ######
  #   #
# # # #
# # # #
# # # #
#   # #
#####  
```

```java
x######
xx#xxx#
#x#x#x#
#x#x#x#
#x#x#x#
#xxx#x#
#####xx
```

`maze/Maze.java` 

```java
package maze;

/**
 * 表示一个 2D 网格迷宫。
 */
public class Maze {
    /** 网格存储 (true = 墙, false = 空) */
    private boolean[][] grid;
    /** 行数 */
    private int numRows;
    /** 列数 */
    private int numCols;

    /**
     * 构造函数。
     * @param rows 行数 (>0)。
     * @param cols 列数 (>0)。
     * @throws IllegalArgumentException 如果维度无效。
     */
    public Maze(int rows, int cols) {
        if (rows <= 0 || cols <= 0) {
            throw new IllegalArgumentException("迷宫维度必须为正数。 Rows: " + rows + ", Cols: " + cols);
        }
        this.numRows = rows;
        this.numCols = cols;
        this.grid = new boolean[rows][cols]; // 默认 false (空)
    }

    /**
     * 在 (row, col) 处设置墙。
     * @param row 行索引。
     * @param col 列索引。
     * @throws MazeBoundsException 如果坐标超出边界。
     */
    public void setWall(int row, int col) throws MazeBoundsException {
        checkBounds(row, col);
        this.grid[row][col] = true; // true 代表墙
    }

    /**
     * 检查 (row, col) 处是否有墙。
     * @param row 行索引。
     * @param col 列索引。
     * @return 如果是墙则返回 true。
     * @throws MazeBoundsException 如果坐标超出边界。
     */
    public boolean isWall(int row, int col) throws MazeBoundsException {
        checkBounds(row, col);
        return this.grid[row][col];
    }

    /**
     * 获取行数。
     * @return 行数。
     */
    public int getNumRows() {
        return this.numRows;
    }

    /**
     * 获取列数。
     * @return 列数。
     */
    public int getNumCols() {
        return this.numCols;
    }

    /**
     * 检查坐标是否在边界内。
     * @param row 行索引。
     * @param col 列索引。
     * @throws MazeBoundsException 如果坐标无效。
     */
    private void checkBounds(int row, int col) throws MazeBoundsException {
        if (row < 0 || row >= this.numRows || col < 0 || col >= this.numCols) {
            throw new MazeBoundsException("坐标 (" + row + ", " + col + ") 超出迷宫边界 (大小: "
                                        + this.numRows + "x" + this.numCols + ")");
        }
    }
}
```

`maze/MazeBoundsException.java`

```java
package maze;

public class MazeBoundsException extends Exception {

    public MazeBoundsException() {
        super();
    }

    public MazeBoundsException(String message) {
        super(message);
    }
}
```

- 7. 生成随机墙，显示迷宫和解决方案

`RandomMaze.java`

```java
package maze;

import java.util.Random; // 导入 Random 类

/**
 * 创建具有随机墙壁的迷宫。
 */
public class RandomMaze extends Maze {

    /**
     * 构造函数。
     * @param rows 行数 (>0)。
     * @param cols 列数 (>0)。
     * @param wallProbability 墙壁概率 ([0.0, 1.0])。
     */
    public RandomMaze(int rows, int cols, double wallProbability) {
        // 调用父构造函数初始化网格
        super(rows, cols);

        if (wallProbability < 0.0 || wallProbability > 1.0) {
            throw new IllegalArgumentException("墙壁概率必须在 0.0 到 1.0 之间");
        }

        Random rand = new Random(); // 创建 Random 实例

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                // 使用 rand.nextDouble() 替代 Math.random()
                if (rand.nextDouble() < wallProbability) {
                    try {
                        // 设置墙壁，处理必需的异常
                        setWall(r, c);
                    } catch (MazeBoundsException e) {
                        // 理论上不应发生
                        System.err.println("内部错误: setWall 失败于 (" + r + "," + c + ")");
                        e.printStackTrace();
                    }
                }
            }
        }
    }
}
```

`MathSolver.java`

```java
import maze.*;
import java.util.ArrayDeque;
import java.util.Queue;

// 存储迷宫位置
class MazeLocation {
    public int row, col;
    public MazeLocation(int row, int col) {
        this.row = row;
        this.col = col;
    }
}

public class MazeSolver {

    public static void main(String[] args) {
        int rows = 10, cols = 10;
        double probability = 0.2;

        // 创建随机迷宫
        Maze maze = new RandomMaze(rows, cols, probability);
        System.out.println("迷宫 (" + rows + "x" + cols + ", P(墙)=" + probability + "):");
        System.out.println("('#'=墙, ' '=空, 'x'=路径)");

        // 广度优先搜索 (BFS) 求解
        MazeLocation[][] parent = new MazeLocation[rows][cols]; // 存储路径前驱
        boolean found = false;

        parent[0][0] = new MazeLocation(-1, -1); // 标记起点
        Queue<MazeLocation> queue = new ArrayDeque<>();
        queue.add(new MazeLocation(0, 0));

        int[][] dirs = {{1, 0}, {0, 1}, {-1, 0}, {0, -1}}; // 四个方向

        try {
            while (!queue.isEmpty() && !found) {
                MazeLocation loc = queue.remove();

                if (loc.row == rows - 1 && loc.col == cols - 1) { // 到达终点
                    found = true;
                    break;
                }

                // 探索邻居
                for (int[] dir : dirs) {
                    int nextRow = loc.row + dir[0];
                    int nextCol = loc.col + dir[1];

                    // 检查有效性：边界内、非墙、未访问
                    if (nextRow >= 0 && nextRow < rows && nextCol >= 0 && nextCol < cols
                            && !maze.isWall(nextRow, nextCol)
                            && parent[nextRow][nextCol] == null)
                    {
                        parent[nextRow][nextCol] = loc; // 记录前驱
                        queue.add(new MazeLocation(nextRow, nextCol)); // 加入队列
                    }
                }
            }

            // 打印结果
            boolean[][] path = new boolean[rows][cols];

            if (!found) {
                System.out.println("\n无解！");
                // 仅打印迷宫本身
                 for (int r = 0; r < rows; r++) {
                    for (int c = 0; c < cols; c++) {
                       if (maze.isWall(r, c)) System.out.print("#");
                       else System.out.print(" ");
                    }
                    System.out.println();
                }
            } else {
                System.out.println("\n找到路径！");
                // 回溯标记路径
                MazeLocation curr = new MazeLocation(rows - 1, cols - 1);
                while (curr.row != -1) { // 回溯到起点标记
                    path[curr.row][curr.col] = true;
                    curr = parent[curr.row][curr.col];
                }

                // 打印带路径的迷宫
                for (int r = 0; r < rows; r++) {
                    for (int c = 0; c < cols; c++) {
                        if (path[r][c]) System.out.print("x");
                        else if (maze.isWall(r, c)) System.out.print("#");
                        else System.out.print(" ");
                    }
                    System.out.println();
                }
            }

        } catch (MazeBoundsException e) {
            // 处理 isWall 异常 (理论上应避免)
            System.err.println("迷宫边界错误: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
```

# 10.0 Thread, Lambda

## Multi Processing

**多进程**是操作系统的一个核心特性，它允许你同时运行多个程序 。

- 如果你的计算机只有一个**核心 (single core)**，操作系统会调度进程，使它们看起来像是并发执行的 

- 如果计算机有**多个核心 (multiple cores)**，操作系统会将这些进程分配到不同的核心上执行 。

实现的简单方法可能是同时运行几个 Java 程序，但是这种方法有限制，进程之间无法通信

## Multi Threading

并发：一个单独的进程也可以拥有多个**执行线程**，用处如下：

- **Responsiveness**

  我们正在编写读取大文件的代码。如果为了等待文件加载而不得不暂停整个程序，那将是很糟糕的。相反，我们可以让一个线程读取文件，而另一个线程更新图形用户界面（GUI）或执行其他操作。

- **Efficiency**

  现代计算机通常有很多核心，我们将希望编写能够利用所有这些核心的代码，以最大限度地提高效率。[Java支持多线程代码](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/
  Thread.html) 。这是通过 `Thread` 类实现的 。每个 `Thread` 类的实例代表一个新的执行线程 。如果我们创建多个线程，我们就可以让代码的多个部分同时执行 。通常，我们会想要扩展这个类并重写其 `run()` 方法 。

### Create a Tread

#### Ex1

```java
class MyThread extends Thread {
    private int number;

    public MyThread(int number) {
        this.number = number;
    }

    @Override
    public void run() {
        System.out.println("MyThread (" + number + ") running");
    }
}

public class ThreadExample {
    public static void main(String[] args) {
        for (int i = 0; i < 10; i++) {
            MyThread t = new MyThread(i);
            t.start();
        }
    }
}
```

定义一个类继承 Thread 然后构造函数初始化，重载 run 函数，在 ThreadExample 类的 main 方法中创建了一个循环，循环十次。在每次循环中，会创建一个 `MyThread` 类的实例 `t`，并传入当前的循环变量 `i` 作为线程编号 。然后，调用 `t.start()` 方法 。一旦调用 `start()` 方法，`run()` 方法中的代码就会在一个新的线程中并发执行 。**注意：**因为线程调度的不确定性 ，运行这个程序会注意到线程的执行顺序并非严格按照 0 到 9 的顺序。

#### Ex2

```java
class MyRunnable implements Runnable {
    private int number;

    public MyRunnable(int number) {
        this.number = number;
    }

    @Override
    public void run() {
        System.out.println("MyThread (" + number + ") running");
    }
}

public class RunnableExample {
    public static void main(String[] args) {
        for (int i = 0; i < 10; i++) {
            Thread t = new Thread(new MyRunnable(i));
            t.start();
        }
    }
}
```

`Runnable` 接口也可以用来创建线程，定义后使用构造函数用于接受和储存整数，重载 `run` 方法后在 `main` 中用 `Thread` 其中的一个构造函数可接收 `Runnable`对象，然后启动。一般来说这种方法更受推荐因为可以多重实现，第一个方法不支持多重继承。

### Join

一旦我们启动了一个线程，有时需要等待它执行完毕才能继续主程序的后续步骤，特别是当后续步骤依赖于该线程的执行结果时 。例如，如果你创建了两个线程分别从两个不同的数据库读取数据，你可能需要等待两个线程都返回结果后才能继续程序的下一步操作 。

- Java 提供了 `join()` 方法：一个线程完成了 `run()` 方法执行后调用 `join()` 就会使当前线程等待直到线程执行完毕

  ```java
  public class JoinExample {
      public static void main(String[] args) {
          Thread[] threads = new Thread[10];
          for (int i = 0; i < 10; i++) {
              threads[i] = new MyThread(i);
              threads[i].start();
          }
  
          for (int i = 0; i < 10; i++) {
              try {
                  threads[i].join();
              } catch (InterruptedException e) {}
          }
          System.out.println("All threads finished");
      }
  }
  ```

  十个线程全部执行完毕后才会被打印出来。`join()` 方法会抛出一个 `InterruptedException` (检查型异常) 。这种情况会在一个线程的执行以非预期的方式结束时发生 

### Race condition

**Race Condition**: 当两个或多个线程试图同时对共享数据进行操作，并且操作的执行顺序会影响最终结果时，就发生了竞态条件。每次运行程序结果都不同因此一不小心就变成了 bug。

#### Ex1

```java
class SpecialInt {
    private int value;

    public SpecialInt(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    public void increment() {
        value++;
    }
}
```

```java
class AddThread extends Thread {
    private SpecialInt specialInt;

    public AddThread(SpecialInt specialInt) {
        this.specialInt = specialInt;
    }

    public void run() {
        for (int i = 0; i < 1000000; i++) {
            specialInt.increment();
        }
    }
}
```

```java
public class RaceCondition {
    public static void main(String[] args) {
        SpecialInt specialInt = new SpecialInt(0);
        Thread t1 = new AddThread(specialInt);
        Thread t2 = new AddThread(specialInt);

        t1.start();
        t2.start();

        try {
            t1.join();
            t2.join();
        } catch (InterruptedException e) {}

        System.out.println(specialInt.getValue());
    }
}
```

这个程序会导致大量的竞态条件 。如果你运行这个程序，会发现输出结果通常不是2,000,000 。这是因为 `specialInt.increment()` 操作（即 `value++`）不是原子性的。它实际上包含三个步骤：读取 `value` 的当前值，将该值加1，然后将新值写回 `value`。多个线程的这三个步骤可能会交错执行，导致某些增加操作丢失。

- Good: Thread A reads 0, A writes 1, B reads 1, B writes 2

- **Bad: Thread A reads 0, B reads 0, A writes 1, B writes 1**

### Synchronized

```java
synchronized (object) {
    // ... code ...
}
```

Java 提供同步语句，当一个线程进入这个代码块时，它会尝试获取 `object` 对象上的锁。

- 如果该对象已经被其他线程锁定，那么当前线程将会等待，直到该对象被释放
- 线程锁定对象、执行代码块代码、被解锁

该字段有效避免了竞态

```java
class AddThread extends Thread {
    private SpecialInt specialInt;

    public AddThread(SpecialInt specialInt) {
        this.specialInt = specialInt;
    }

    public void run() {
        for (int i = 0; i < 1000000; i++) {
            synchronized (specialInt) {
                specialInt.increment();
            }
        }
    }
}
```

以上这个方法是在调用期间给 `object` 临时设置同步，直接在原类直接设置 method 为同步一样有效

```java
class SpecialInt {
    private int value;

    public SpecialInt(int value) {
        this.value = value;
    }

    public int getValue() {
        return value; //
    }

    public synchronized void increment() { //
        value++;
    }
}
```

两者同样安全有效

### Deadlock

由于 Java 的同步关键字只针对单个对象：线程 A 持有对象 1 的锁，想要获取对象 2 的锁；同时 B 持有对象 2 的锁并且想要获取对象 1 的锁。这种情况会永远等待下去导致死锁，就像两个礼貌的人永远互相谦让。

```java
synchronized (specialInt1) { // 先获取 specialInt1 的锁
    // ...
    synchronized (specialInt2) { // 再获取 specialInt2 的锁
        // ... 对两者进行操作 ...
    }
}
```

因此如果在执行的时候实现安全锁，只能通过这种方式逐个获取锁

```java
Thread t1 = new AddBothThread(specialInt1, specialInt2); //
Thread t2 = new AddBothThread(specialInt2, specialInt1); // 注意参数顺序

t1.start();
t2.start();
```

由于传递参数顺序的不同导致了死锁：线程 t1 等待 t2 释放，线程 t2 等待 t1 释放。这种情况会永远等待下去导致死锁，就像两个礼貌的人永远互相谦让。修复方法就是 t2 传参顺序改为与 t1 一致。

### Inter-thread communication

假设我们有一个线程，它需要等待某个对象被更新后才能继续执行 。这个线程需要释放它持有的锁，以便其他线程可以更新该对象 。

#### `wait()`

- `wait()` 方法用于将当前线程置于“等待”状态 。
- 其必须在 `synchronized` 代码块或同步方法内部
- 一旦调用了 `wait()`，线程会**释放**它在该对象上持有的锁，并进入等待状态，直到另一个线程在该对象上调用 `notify()` 。

#### `notify() and notifyAll()`

- **`notify()`**: 唤醒**单个**正在等待该对象锁的线程 。如果有多个线程在等待，会任意选择一个进行唤醒。
- **`notifyAll()`**: 唤醒**所有**正在等待该对象锁的线程 。优先级最高的线程会首先获得锁 。
- 同样也**必须**在同步上下文中调用

#### ProduceConsume

这个例子演示了生产者消费者模式，一个线程生成数据，另外一个消费数据

```java
class ProduceConsume {
    private String sharedResource; // 共享资源

    // 生产者方法
    public synchronized void produce(String value) throws InterruptedException { //
        while (sharedResource != null) {
            // 等待消费者消费资源
            wait();
        }
        sharedResource = value;
        System.out.println("Produced: " + value);
        // 通知消费者资源已准备好
        notify();
    }

    // 消费者方法
    public synchronized void consume() throws InterruptedException {
        while (sharedResource == null) {
            // 等待生产者生产资源
            wait();
        }
        System.out.println("Consumed: " + sharedResource);
        sharedResource = null;
        // 通知生产者资源已被消费
        notify();
    }
}
```

那么这样一来线程在调用这类方法的时候，在不同类里生产十次和消费十次，调用的时候就可以确保线程同步的同时数据是正确被消费，有了生产才有消费。

## Anonymous Class

```java
class MyStringComparator implements Comparator<String> {
    private static int countOccurences (String s, char c)
        int count = 0;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == c) {
                count++;
            }
        }
        return count;
    }

    @Override
    public int compare (String s1, String s2) { 
        return countOccurences (s1, 'e') - countOccurences (s2, 'e'); 
    }
}
```

```java
public class Sorting {
    public static void main(String[] args) {
        String[] strings = {"elevated", "banana", "elephant", "early"}; 
        Arrays.sort(strings, new MyStringComparator());
        System.out.println(Arrays.toString(strings));
    }
}
```

有时候你只需要一个一次性的对象，**匿名类**允许在不显式声明一个新类的情况下创建一个自定义对象 。这在完整类定义会显得繁琐的情况下特别有用。`Arrays.sort(array, comparator)` 方法使用 `Comparator<T>` 的实例来对数组进行排序 。这个接口只有一个需要实现的方法，即 `compare(a, b)` 。只是为了实现这个方法可以看到就要创建一个新的 `MyStringComparator`。

```java
public class AnonymousSorting {
    private static int countOccurences (String s, char c) { 
        int count = 0;
        for (int i = 0; i < s.length(); i++) { 
            if (s.charAt(i) == c) count++; 
        }
        return count; 
    }

    public static void main(String[] args) {
        String[] strings = {"elevated", "banana", "elephant", "early"}; 
        Arrays.sort(strings, new Comparator<String>() { 
            public int compare (String s1, String s2) { 
                return countOccurences (s1, 'e') - countOccurences (s2, 'e'); 
            }
        }); 
        System.out.println(Arrays.toString(strings)); 
    }
}
```

可以看到语法是以下这样非常简洁，甚至可以 extends a class

```java
new ExistingClassOrInterface (arg1, arg2) {
    // override methods here
    // you can add fields too
}
```

## Lambda Expression

本质上是匿名方法或函数，现在犹豫其更方便，经常取代匿名类

```java
(parameter) -> expression
(param1, param2) -> expression
```

```java
Comparator<String> comp = (s1, s2) -> s1.length() - s2.length();
```

直接创建一个 `Comparator` 来根据字符串的长度比较两个字符串，省略类型让其自动推断

```java
public class LambdaSorting {
    private static int countOccurences (String s, char c) { 
        int count = 0; 
        for (int i = 0; i < s.length(); i++) { 
            if (s.charAt(i) == c) count++; 
        }
        return count; 
    }

    public static void main(String[] args) {
        String[] strings = {"elevated", "banana", "elephant", "early"}; 
        Arrays.sort(strings, (s1, s2) -> countOccurences(s1, 'e') - countOccurences(s2, 'e')); 
        System.out.println(Arrays.toString(strings)); 
    }
}
```

因此可以看到这个比较版本的过载是最简单的非常紧凑，方法里的参数甚至不用写类型自动推断

### Details

可以不接受参数、多个 expressions，但是如果是多个参数中的 expressions 有 return 语句必须显示

```java
public class LambdaRunnable {
    public static void main(String[] args) {
        Runnable r = () -> {
            System.out.println("Hello, world!"); 
            return 1;
        }; 
        r.run(); 
    }
}
```

## Javadoc

**Javadoc** 是一个可以从 Java 源代码直接自动生成 HTML 格式 API 文档的工具 。你需要将 Javadoc 注释放在类、字段和方法声明的正前方，格式如下：

```java
/**
 * 这是一个 Javadoc 注释。
 * 它描述了它前面的类、方法或字段。
 */
```

其注释可以包含**标签** (tags) 以提供关于代码更具体的信息，下述为 method 版本注释

```java
/**
 * 这个方法做某事。 
 *
 * @param param 参数的描述 
 * @return 返回值的描述 
 * @throws ExceptionType 何时会抛出该异常 
 */
public ReturnType methodName (Type param) throws ExceptionType {
    // 方法体
}
```

这个版本是类的：

```java
/**
 * 这是一个类上的 Javadoc 注释示例。 
 */
public class Javadoc {

    /**
     * 如果给定的整数是偶数，此方法返回 true，否则返回 false。 
     * @param x 要检查的整数 
     * @return 如果 x 是偶数则返回 true，否则返回 false 
     */
    public boolean isEven (int x) {
        return x % 2 == 0; // 
    }
}
```

要从 Java 文件中直接生成 HTML 文档，官方文档就是如此生成：

```java
javadoc Javadoc.java -d mydocs 
```

`mydocs` 是文件夹名
