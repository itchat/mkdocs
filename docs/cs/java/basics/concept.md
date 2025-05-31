# Open Book Exam

## 1. Java Basics

### 1.1. The `main` Method
The `main` method is the entry point of any Java application.
- **Signature:** `public static void main(String[] args)`
  - `public`: Access modifier, makes it globally available.
  - `static`: Allows the method to be called without creating an object of the class. The JVM calls `main` before any objects are made.
  - `void`: Indicates that the `main` method does not return any value.
  - `String[] args`: An array of `String` type that stores command-line arguments.

### 1.2. Data Types

Java has two categories of data types:

| Feature          | Primitive Types                     | Reference Types                     |
|------------------|-------------------------------------|-------------------------------------|
| **Definition**   | Predefined, basic data types.       | Refer to objects or `null`.         |
| **Storage**      | Store actual values.                | Store memory addresses of objects.  |
| **Examples**     | `byte`, `short`, `int`, `long`, `float`, `double`, `char`, `boolean` | Classes, Interfaces, Arrays, Enums, `String` |
| **Default Value**| Numeric: `0`, `boolean`: `false`, `char`: `\u0000` | `null`                              |
| **Memory**       | Stack (for local variables)         | Heap (for objects), Stack (for references) |

**Example:**
```java
public class DataTypesExample {
    public static void main(String[] args) {
        // Primitive type
        int age = 30; // Stored directly
        System.out.println("Age: " + age);

        // Reference type
        String name = "Java"; // 'name' holds address of "Java" object
        System.out.println("Name: " + name);
    }
}
```

### 1.3. `final` Keyword
The `final` keyword is used to restrict modification. It can be applied to variables, methods, and classes.

| Applied to | Effect                                                                 | Example                               |
|------------|------------------------------------------------------------------------|---------------------------------------|
| **Variable** | Value cannot be changed once assigned (constant). For reference variables, the reference cannot be changed, but the object's state can. | `final int MAX_VALUE = 100;` <br> `final MyObject obj = new MyObject();` |
| **Method**   | Cannot be overridden by subclasses.                                    | `class A { final void display() {} }` |
| **Class**    | Cannot be subclassed (inherited from).                                 | `final class FinalClass {}`           |

**Key points:**
- A `final` variable must be initialized at the time of declaration or in the constructor (if it's an instance variable).

### 1.4. `static` Keyword
The `static` keyword indicates that a member belongs to the class itself, rather than to instances of the class.

| Applied to        | Effect                                                                    | Notes                                                                |
|-------------------|---------------------------------------------------------------------------|----------------------------------------------------------------------|
| **Variable**      | Class variable; shared among all instances. Only one copy exists.         | Initialized when class is loaded.                                    |
| **Method**        | Class method; can be called using `ClassName.methodName()`. Can only access static members directly. Cannot use `this` or `super`. | Often used for utility functions. `main` method is static.           |
| **Block**         | Static initialization block; executed once when the class is loaded.      | Used for initializing static variables.                              |
| **Nested Class**  | A static nested class can access static members of the outer class. It does not have access to instance members of the outer class. | Behaves like a top-level class but is packaged within another class. |

**Example:**
```java
class Counter {
    static int count = 0; // Static variable
    Counter() { count++; }

    static void displayCount() { // Static method
        System.out.println("Count: " + count);
    }
    public static void main(String[] args) {
        new Counter(); new Counter();
        Counter.displayCount(); // Outputs: Count: 2
    }
}
```

### 1.5. Scope of Variables
Scope refers to the region of a program where a variable is accessible.

| Scope Type        | Definition                                                                 | Lifetime                                       |
|-------------------|----------------------------------------------------------------------------|------------------------------------------------|
| **Member Variable (Instance)** | Declared inside a class but outside any method. Belongs to an instance. | As long as the object exists in memory.        |
| **Static Variable (Class)** | Declared with `static` keyword. Belongs to the class.                 | As long as the class is loaded in memory.      |
| **Local Variable**| Declared inside a method, constructor, or block.                           | Only within that method, constructor, or block. |
| **Block Variable**| Declared inside a specific block of code (e.g., within `{}`).              | Only within that block.                        |

### 1.6. Type Casting
Converting a value from one data type to another.

1.  **Widening Casting (Implicit):**
    - Converting a smaller type to a larger type size (`byte -> short -> char -> int -> long -> float -> double`).
    - Automatic, no data loss. Example: `int i = 100; long l = i;`
2.  **Narrowing Casting (Explicit):**
    - Converting a larger type to a smaller size type (`double -> float -> long -> int -> char -> short -> byte`).
    - Manual, requires explicit cast, potential data loss. Example: `double d = 100.04; int i = (int)d; // i is 100`

// End of Section 1.6 Type Casting

### 1.7. Basic Array Operations
Arrays are fixed-size, ordered collections of elements of the same type. They are a fundamental data structure in Java.

**Declaration and Initialization:**
```java
// Declaration
int[] numbers;
String[] names;

// Initialization with size (elements get default values: 0 for int, null for String)
numbers = new int[5]; // Array of 5 integers
String[] messages = new String[3]; // Array of 3 Strings

// Initialization with values
names = new String[]{"Alice", "Bob", "Charlie"}; // Using new
int[] scores = {10, 20, 30}; // Shorthand initialization
```

**Length:**
The `length` property (not a method) gives the number of elements an array can hold.
```java
int[] data = {1, 2, 3};
int arrayLength = data.length; // arrayLength will be 3
```

**Accessing Elements:**
Array elements are accessed using a zero-based index.
```java
String[] fruits = {"Apple", "Banana", "Cherry"};
String firstFruit = fruits[0]; // "Apple"
fruits[1] = "Blueberry"; // Modifies the second element
// Accessing fruits[3] would throw an ArrayIndexOutOfBoundsException
```

**Common Manipulations (Examples inspired by `t1.md` Q12):**

1.  **In-place Rotation (left by one):** Modifies the original array.
    ```java
    public class ArrayRotateInPlace {
        static void rotateLeftInPlace(int[] arr) {
            if (arr == null || arr.length <= 1) return;
            int firstElement = arr[0]; // Store the first element
            for (int i = 0; i < arr.length - 1; i++) {
                arr[i] = arr[i + 1]; // Shift elements to the left
            }
            arr[arr.length - 1] = firstElement; // Place first element at the end
        }
        public static void main(String[] args) {
            int[] data = {1, 2, 3, 4, 5};
            rotateLeftInPlace(data);
            System.out.println(java.util.Arrays.toString(data)); // Output: [2, 3, 4, 5, 1]
        }
    }
    ```

2.  **Returning a New Rotated Array (left by one):** Original array remains unchanged.
    ```java
    public class ArrayRotateNew {
        static int[] rotatedLeftNewArray(int[] arr) {
            if (arr == null || arr.length == 0) return new int[0]; // Handle empty or null
            if (arr.length == 1) return java.util.Arrays.copyOf(arr, arr.length);

            int[] result = new int[arr.length];
            int firstElement = arr[0];
            for (int i = 0; i < arr.length - 1; i++) {
                result[i] = arr[i + 1];
            }
            result[arr.length - 1] = firstElement;
            return result;
        }
        public static void main(String[] args) {
            int[] originalData = {1, 2, 3, 4, 5};
            int[] newData = rotatedLeftNewArray(originalData);
            System.out.println(java.util.Arrays.toString(originalData)); // [1, 2, 3, 4, 5]
            System.out.println(java.util.Arrays.toString(newData));    // [2, 3, 4, 5, 1]
        }
    }
    ```

### 1.8. Loops
Loops are used to execute a block of code repeatedly as long as a specified condition is true.

**Types of Loops:**

| Loop Type         | Description                                                                                     |
|-------------------|-------------------------------------------------------------------------------------------------|
| **`for` loop**    | Executes a block of code a specific number of times.                                          |
| **`while` loop**  | Repeatedly executes a block of code as long as a given condition is `true`.                   |
| **`do-while` loop**| Like `while`, but guarantees at least one execution of the loop body.                          |

**Loop Control Statements:**

| Statement          | Description                                                                                     |
|-------------------|-------------------------------------------------------------------------------------------------|
| **`break`**       | Exits the loop immediately.                                                                         |
| **`continue`**    | Skips the current iteration and proceeds to the next iteration of the loop.                        |

**Example:**
```java
public class LoopExamples {
    public static void main(String[] args) {
        // For loop
        for (int i = 0; i < 5; i++) {
            System.out.println("Iteration: " + i);
        }

        // While loop
        int j = 0;
        while (j < 5) {
            System.out.println("While Iteration: " + j);
            j++;
        }

        // Do-while loop
        int k = 0;
        do {
            System.out.println("Do-While Iteration: " + k);
            k++;
        } while (k < 5);
    }
}
```

## 2. Object-Oriented Programming (OOP)
OOP is a paradigm based on "objects", which contain data (attributes) and code (methods).

**Core Principles:**

| Principle       | Description                                                                                                | Java Mechanisms                                     |
|-----------------|------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| **Encapsulation** | Bundling data and methods within a class. Hiding internal state via `private` access and public getters/setters. | Access modifiers (`private`, `protected`, `public`) |
| **Inheritance**   | A new class (subclass) acquires properties/behaviors of an existing class (superclass). Promotes code reuse. | `extends` keyword, `super` keyword                  |
| **Polymorphism**  | "Many forms". Objects treated as instances of a common superclass, allowing a single action in different ways. | Method Overriding (runtime), Method Overloading (compile-time) |
| **Abstraction**   | Hiding complex implementation details, showing only essential features.                                      | Abstract classes, Interfaces                        |

### 2.1. Encapsulation
**Example:**
```java
class Person {
    private String name; // Private variable
    public String getName() { return name; } // Getter
    public void setName(String name) { this.name = name; } // Setter
}
```

### 2.2. Inheritance
- `extends` keyword for class inheritance.
- `super` keyword: Refers to superclass members. `super()` calls superclass constructor.
- `this` keyword: Refers to current instance. `this()` calls another constructor in the same class.

| `this()`                                  | `super()`                                       |
|-------------------------------------------|-------------------------------------------------|
| Calls a constructor of the same class.    | Calls a constructor of the immediate superclass. |
| Must be the first statement in a constructor. | Must be the first statement in a constructor.   |

**IS-A vs. HAS-A Relationships (inspired by `t1.md` Q10):**
Inheritance represents an "IS-A" relationship (e.g., a `Dog` IS-A `Animal`). This is different from a "HAS-A" relationship (composition), where a class contains an instance of another class (e.g., a `Car` HAS-A `Engine`).
- `Potato` IS-A `Vegetable` (subclass relationship is reasonable).
- `House` IS-A `Building` (subclass relationship is reasonable).
- A `Window` is part of a `House` (HAS-A), not typically "IS-A" `House`.

**Example:**
```java
class Animal {
    Animal() { System.out.println("Animal created"); }
}
class Dog extends Animal { // Dog inherits from Animal
    Dog() {
        super(); // Calls Animal() constructor
        System.out.println("Dog created");
    }
    public static void main(String[] args) { new Dog(); }
}
```

### 2.3. Polymorphism

#### 2.3.1. Method Overriding (Runtime Polymorphism)
- Subclass provides specific implementation for a method in its superclass.
- Same name, parameters, return type (or covariant). Access modifier not more restrictive.
- `@Override` annotation is recommended. `final` or `static` methods cannot be overridden.

**Example:**
```java
class Vehicle { void run() { System.out.println("Vehicle running"); } }
class Bike extends Vehicle {
    @Override void run() { System.out.println("Bike running"); }
    public static void main(String[] args) {
        Vehicle myVehicle = new Bike(); // Upcasting
        myVehicle.run(); // Calls Bike's run()
    }
}
```

#### 2.3.2. Method Overloading (Compile-time Polymorphism)
- Same class, same method name, different parameters (number, type, or order).
- Return type can differ but doesn't determine overloading.

**Example:**
```java
class Adder {
    static int add(int a, int b) { return a + b; }
    static double add(double a, double b) { return a + b; } // Overloaded
    public static void main(String[] args) {
        System.out.println(Adder.add(5, 5));     // int version
        System.out.println(Adder.add(5.5, 5.5)); // double version
    }
}
```

**Comparison: Overloading vs. Overriding**

| Feature          | Method Overloading                      | Method Overriding                         |
|------------------|-----------------------------------------|-------------------------------------------|
| **Purpose**      | Increase readability.                   | Provide specific implementation.          |
| **Location**     | Same class.                             | Superclass/Subclass.                      |
| **Parameters**   | Must be different.                      | Must be the same.                         |
| **Return Type**  | Can be different.                       | Same or covariant.                        |
| **Polymorphism** | Compile-time (Static Binding).          | Run-time (Dynamic Binding).               |

### 2.4. Abstraction
Hiding implementation, showing functionality. Uses abstract classes and interfaces.

#### 2.4.1. Abstract Class
- Declared with `abstract`. Cannot be instantiated.
- Can have abstract (no body) and concrete methods.
- Subclass must implement all abstract methods or be abstract itself.
- Can have constructors, static/final methods, instance variables.

**Example:**
```java
abstract class Shape { abstract void draw(); } // Abstract class & method
class Circle extends Shape {
    void draw() { System.out.println("Drawing Circle"); }
    public static void main(String[] args) {
        Shape s = new Circle(); s.draw(); // Drawing Circle
    }
}
```

#### 2.4.2. Interface
- Blueprint of a class (`interface` keyword). Cannot be instantiated.
- Contains `public abstract` methods and `public static final` constants by default.
- A class `implements` one or more interfaces. An interface can `extend` others.
- Java 8+: `default` and `static` methods with implementation. Java 9+: `private` methods.

**Example:**
```java
interface Drawable { void draw(); } // Interface
class Rectangle implements Drawable {
    public void draw() { System.out.println("Drawing rectangle"); } // Must be public
    public static void main(String[] args) {
        Drawable d = new Rectangle(); d.draw(); // Drawing rectangle
    }
}
```

**Comparison: Abstract Class vs. Interface**

| Feature             | Abstract Class                                     | Interface                                                     |
|---------------------|----------------------------------------------------|---------------------------------------------------------------|
| **Methods**         | Abstract and concrete methods.                     | `public abstract` methods (default). Java 8+ default/static. |
| **Variables**       | Any type of variable.                              | `public static final` constants only.                         |
| **Inheritance**     | Class extends one abstract class.                  | Class implements multiple interfaces.                         |
| **Constructors**    | Yes (called via `super()`).                        | No.                                                           |
| **Purpose**         | Share common code (IS-A with shared state/behavior). | Define a contract (CAN-DO). Multiple inheritance of type.     |

## 3. Constructors
- Special method to initialize objects. Same name as class, no return type.
- **Default Constructor:** No parameters. Compiler-provided if none defined.
- **Parameterized Constructor:** Has parameters for initialization.
- **Constructor Overloading:** Multiple constructors with different parameters.

**Example:**
```java
class Box {
    Box() { System.out.println("Box created (no-arg)"); }
    Box(int size) { System.out.println("Box created (size: " + size + ")"); }
    public static void main(String[] args) {
        new Box(); new Box(10);
    }
}
```

## 4. Exception Handling
Handles runtime errors using `try`, `catch`, `finally`, `throw`, `throws`.

**Hierarchy:** `Throwable` -> `Error` (unrecoverable) & `Exception` (recoverable).
`Exception` -> `RuntimeException` (unchecked) & other exceptions (checked).

| Keyword   | Description                                                                                                |
|-----------|------------------------------------------------------------------------------------------------------------|
| `try`     | Code block monitored for exceptions.                                                                       |
| `catch`   | Handles specific exception types from `try` block.                                                         |
| `finally` | Always executed, for cleanup (e.g., closing resources).                                                    |
| `throw`   | Explicitly throws an exception instance.                                                                   |
| `throws`  | Declares exceptions a method might throw (caller handles).                                                 |

**Checked vs. Unchecked Exceptions:**

| Feature             | Checked Exceptions                                  | Unchecked Exceptions (RuntimeExceptions)             |
|---------------------|-----------------------------------------------------|------------------------------------------------------|
| **Compiler Check**  | Checked at compile-time.                            | Not checked at compile-time.                         |
| **Handling**        | Must be handled (`try-catch`) or declared (`throws`). | Optional handling.                                   |
| **Examples**        | `IOException`, `SQLException`.                      | `NullPointerException`, `ArrayIndexOutOfBoundsException`. |

**Exception Propagation (inspired by `t2.md` Q6):**
If an exception is thrown and not caught within the current method's `try-catch` block (or if there's no `try-catch`), it propagates up the call stack to the caller method. This process continues until a suitable `catch` block is found. If the exception reaches the `main` method and is not caught, the program terminates, and the exception stack trace is printed.

**Input Pre-validation (inspired by `2024.s1.md` Q5):**
It's good practice to validate inputs before performing operations that might lead to errors or inconsistent states. This often involves checking all inputs for validity at the beginning of a method.
```java
// Conceptual example for input validation
class DataProcessor {
    public void processInputs(int[] inputs) {
        // 1. Validate all inputs first
        for (int input : inputs) {
            if (!isValid(input)) {
                throw new IllegalArgumentException("Invalid input detected: " + input);
            }
        }
        // 2. Proceed with processing if all inputs are valid
        for (int input : inputs) {
            // perform operation on 'input'
            System.out.println("Processing valid input: " + input);
        }
    }
    private boolean isValid(int input) {
        return input >= 0; // Example validation logic
    }
    public static void main(String[] args) {
        DataProcessor processor = new DataProcessor();
        try {
            processor.processInputs(new int[]{1, 2, -1, 3});
        } catch (IllegalArgumentException e) {
            System.err.println(e.getMessage()); // Invalid input detected: -1
        }
    }
}
```

## 5. Strings
`String` objects represent character sequences and are immutable.

### 5.1. String Immutability
- Once a `String` object is created, its value cannot change.
- Operations like concatenation create new `String` objects.
- Benefits: Thread safety, security, caching (string pool).

**String Immutability and Arrays (inspired by `2024.s1.md` Q4):**
While `String` objects are immutable, an array of `String` (i.e., `String[]`) is mutable. Modifying an element of a `String` array means changing the reference stored in that array slot to point to a *different* `String` object. The original `String` objects themselves remain unchanged in memory.
```java
public class StringArrayModification {
    public static void main(String[] args) {
        String[] words = {"these", "words", "change"};
        // words[0] refers to "these", words[1] to "words", words[2] to "change".

        // Concatenation creates a new String object "thesewords".
        // words[2] is updated to refer to this new String object.
        words[2] = words[0] + words[1];

        // words[1] is updated to refer to the same String object as words[0] ("these").
        words[1] = words[0];

        // The original String objects ("these", "words", "change") are still immutable.
        // What changed are the references held by the 'words' array elements.
        System.out.println(java.util.Arrays.toString(words)); // Output: [these, these, thesewords]
    }
}
```

### 5.2. `String` vs. `StringBuilder` vs. `StringBuffer`

| Feature        | `String`                                  | `StringBuilder`                             | `StringBuffer`                               |
|----------------|-------------------------------------------|---------------------------------------------|----------------------------------------------|
| **Mutability** | Immutable                                 | Mutable                                     | Mutable                                      |
| **Thread-Safe**| Yes (due to immutability)                 | No (not synchronized)                       | Yes (synchronized methods)                   |
| **Performance**| Slower for frequent modifications         | Faster for frequent modifications           | Slower than `StringBuilder` (due to sync)    |
| **Use Case**   | Fixed strings, infrequent changes.        | Single-threaded, frequent modifications.    | Multi-threaded, frequent modifications.      |

**Example:**
```java
public class StringTypes {
    public static void main(String[] args) {
        String s1 = "Java"; s1.concat(" World"); // s1 is still "Java"
        System.out.println(s1);

        StringBuilder sb = new StringBuilder("Hello");
        sb.append(" World"); System.out.println(sb); // Hello World

        StringBuffer sbf = new StringBuffer("Hi");
        sbf.append(" There"); System.out.println(sbf); // Hi There
    }
}
```

## 6. Inner Classes
A class defined within another class.

| Type                  | Description                                                                                                | Access to Outer Members | Instantiation                                                              |
|-----------------------|------------------------------------------------------------------------------------------------------------|-------------------------|----------------------------------------------------------------------------|
| **Member Inner Class**| Non-static, defined at class member level.                                                                 | All (static & instance) | `OuterClass.InnerClass i = outerObj.new InnerClass();`                     |
| **Static Nested Class**| `static` class within another class.                                                                       | Static members only     | `OuterClass.StaticNestedClass n = new OuterClass.StaticNestedClass();`      |
| **Local Inner Class** | Defined within a method/block.                                                                             | Outer members, final/effectively final local vars | Inside method/block.                                                       |
| **Anonymous Inner Class**| Nameless class, defined and instantiated simultaneously. For concise interface/class extension.            | Similar to local inner  | `new InterfaceOrSuperclass() { /*body*/ };`                                 |

**Example: Member Inner Class**
```java
class Outer {
    private int data = 10;
    class Inner { void show() { System.out.println("Data: " + data); } }
    public static void main(String[] args) {
        Outer o = new Outer(); Outer.Inner i = o.new Inner(); i.show(); // Data: 10
    }
}
```

## 7. Generics
Enable type parameterization for classes, interfaces, and methods for compile-time type safety.

**Example:**
```java
class Box<T> { // Generic class
    private T item;
    public void set(T item) { this.item = item; }
    public T get() { return item; }

    public static void main(String[] args) {
        Box<Integer> intBox = new Box<>(); intBox.set(100);
        System.out.println("Integer: " + intBox.get());
        Box<String> strBox = new Box<>(); strBox.set("Hi");
        System.out.println("String: " + strBox.get());
    }
}
```

### 7.1. Multiple Type Parameters
`class Pair<K, V> { K key; V value; ... }`

### 7.2. Bounded Type Parameters
Restricts the types that can be used as type arguments. Uses `extends` (for classes or interfaces).
- `<T extends Number>`: `T` can be `Number` or any subclass of `Number` (e.g., `Integer`, `Double`).
- `<T extends Runnable>`: `T` must be a type that implements the `Runnable` interface.

**Example: Bounded Type Parameter**
```java
class Stats<T extends Number> {
    T[] nums;
    Stats(T[] o) { nums = o; }
    double average() {
        double sum = 0.0;
        for (T num : nums) sum += num.doubleValue();
        return sum / nums.length;
    }
    public static void main(String[] args) {
        Integer[] iNums = {1, 2, 3, 4, 5};
        Stats<Integer> iStats = new Stats<>(iNums);
        System.out.println("Avg: " + iStats.average()); // Avg: 3.0
        // String[] sNums = {"a", "b"}; // Error: String not a Number
        // Stats<String> sStats = new Stats<>(sNums);
    }
}
```

### 7.3. Generic Interfaces
Interfaces can also be generic. Example: `Comparable<T>`.
```java
interface MinMax<T extends Comparable<T>> {
    T min();
    T max();
}
class MyClass<T extends Comparable<T>> implements MinMax<T> {
    T[] vals;
    MyClass(T[] o) { vals = o; }
    public T min() { /* ... */ return vals[0]; } // Simplified
    public T max() { /* ... */ return vals[0]; } // Simplified
}
```

### 7.4. Generic Methods
Methods can have their own type parameters, independent of any class-level type parameters.
- Type parameter list is placed before the return type: `public static <E> void printArray(E[] elements)`

**Example: Generic Method**
```java
public class GenericMethodDemo {
    public static <E> void printArray(E[] elements) {
        for (E element : elements) System.out.print(element + " ");
        System.out.println();
    }
    public static void main(String[] args) {
        Integer[] intArray = {1, 2, 3};
        String[] stringArray = {"A", "B", "C"};
        printArray(intArray);    // 1 2 3
        printArray(stringArray); // A B C
    }
}
```

### 7.5. Type Erasure
Java generics are implemented using type erasure. Generic type information is present only at compile time and is erased at runtime.
- Type parameters are replaced by their bounds (or `Object` if unbounded).
- Compiler inserts casts where necessary.
- **Limitations**: Cannot create instances of type parameters (`new T()`), cannot create arrays of generic types (`new T[5]`), `instanceof` checks for parameterized types don't work as expected at runtime (`obj instanceof List<String>`).

### 7.6. Type Inference with `var` and Diamond Operator (inspired by `t2.md` Q11)
Java provides type inference features to make generic code more concise:

-   **Diamond Operator (`<>`) (Java 7+):** If the generic type is explicitly declared on the left-hand side of an assignment, you can use an empty set of angle brackets (`<>`) on the right-hand side (the "diamond operator"). The compiler infers the type arguments from the context.
    ```java
    List<String> namesList = new ArrayList<String>(); // Pre-Java 7
    List<String> namesListDiamond = new ArrayList<>(); // Java 7+
    Map<String, List<Integer>> complexMap = new HashMap<>();
    ```

-   **`var` Keyword (Java 10+):** For local variable type inference, `var` can be used if the compiler can infer the type from the initializer expression on the right-hand side.
    ```java
    var messages = new ArrayList<String>(); // messages is ArrayList<String>
    var userScores = new HashMap<String, Integer>(); // userScores is HashMap<String, Integer>

    // Combining var with the diamond operator:
    var inferredObjectList = new ArrayList<>(); // Type of inferredObjectList is ArrayList<Object>
                                              // because no type info for elements on the right.
    var specificStringList = new ArrayList<String>(); // Type is ArrayList<String>
    ```
    When using `var`, ensure the right-hand side provides enough information for the desired type, or be aware it might infer a more general type like `Object`.

**Example: Generic Method with Type Inference**
Consider a generic method:
```java
class GenericUtil {
    static <T> ArrayList<T> selectFromArray(ArrayList<T> data, int[] indices) {
        // Explicit type for 'result' with diamond operator
        ArrayList<T> result = new ArrayList<>();

        // Alternatively, using var (Java 10+):
        // var result = new ArrayList<T>(); // T must be inferable for the list elements

        for (int index : indices) {
            if (index >= 0 && index < data.size()) {
                result.add(data.get(index));
            }
        }
        return result;
    }
    public static void main(String[] args) {
        var numbers = new ArrayList<Integer>();
        numbers.add(10); numbers.add(20); numbers.add(30);
        int[] selection = {0, 2};
        ArrayList<Integer> selectedNumbers = selectFromArray(numbers, selection);
        System.out.println(selectedNumbers); // [10, 30]
    }
}
```

## 8. Enums (Enumerations)
Enums (enumerations) define a special data type that enables a variable to be a set of predefined constants. The variable must be equal to one of the values that have been predefined for it. Enums are type-safe and improve code readability and maintainability.

- **Definition**: `enum Day { SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY }`
- **Usage**: `Day today = Day.MONDAY;`
- **Implicitly extends `java.lang.Enum`**: Cannot extend other classes or be extended.
- **Can have fields, constructors, and methods**: Constructors are implicitly `private`.

**Key `java.lang.Enum` methods:**
- `values()`: Returns an array containing all enum constants.
- `ordinal()`: Returns the zero-based position of the constant in its enum declaration.
- `valueOf(String name)`: Returns the enum constant of the specified name.

**Example with fields and methods:**
```java
enum TrafficLight {
    RED("Stop"), GREEN("Go"), YELLOW("Caution");

    private String action;

    TrafficLight(String action) { // Constructor is implicitly private
        this.action = action;
    }

    public String getAction() { return this.action; }

    public static void main(String[] args) {
        TrafficLight light = TrafficLight.RED;
        System.out.println(light + ": " + light.getAction()); // RED: Stop
        for (TrafficLight tl : TrafficLight.values()) {
            System.out.println(tl + " (ordinal " + tl.ordinal() + ")");
        }
    }
}
```

## 9. Important Object Methods: `equals()` and `hashCode()`
- **`equals(Object obj)`:** In `Object` class, checks reference equality (`==`) by default. Override for logical equality.
  - Contract: Reflexive, Symmetric, Transitive, Consistent. `x.equals(null)` is `false`.
- **`hashCode()`:** In `Object` class, returns an integer hash.
  - Contract: If `obj1.equals(obj2)`, then `obj1.hashCode() == obj2.hashCode()`. Consistent return unless `equals` data changes.
- **Override both or neither:** Essential for correct behavior in hash-based collections (`HashMap`, `HashSet`).

**Conceptual Example:**
```java
class Student {
    int id; String name;
    // Constructor...
    @Override public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Student s = (Student) o;
        return id == s.id && java.util.Objects.equals(name, s.name);
    }
    @Override public int hashCode() {
        return java.util.Objects.hash(id, name);
    }
}
```

## 10. Collections Framework (Overview)
Unified architecture for collections. Key interfaces: `List`, `Set`, `Queue`, `Map`.

| Collection Type | Key Characteristics                                  | Common Implementations |
|-----------------|------------------------------------------------------|------------------------|
| **`ArrayList`** | Dynamic array, ordered, duplicates, fast random access. | `List<String> list = new ArrayList<>();` |
| **`LinkedList`**| Doubly-linked list, ordered, duplicates, fast insert/delete. | `List<String> list = new LinkedList<>();` |
| **`HashSet`**   | Hash table, unordered, no duplicates. Allows one `null`. | `Set<String> set = new HashSet<>();` |
| **`TreeSet`**   | Tree (Red-Black), sorted, no duplicates. No `null` (usually). | `Set<String> set = new TreeSet<>();` |
| **`HashMap`**   | Hash table, unordered, key-value, unique keys. `null` key/values allowed. | `Map<String, Integer> map = new HashMap<>();` |
| **`TreeMap`**   | Tree, sorted by keys, key-value, unique keys. No `null` key (usually). | `Map<String, Integer> map = new TreeMap<>();` |

**Example: `ArrayList`**
```java
import java.util.ArrayList; import java.util.List;
public class ArrayListDemo {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>();
        names.add("Alice"); names.add("Bob");
        System.out.println(names.get(0)); // Alice
        for (String name : names) System.out.println(name);
    }
}
```

## 11. Autoboxing and Unboxing
Java provides wrapper classes for each primitive data type (e.g., `Integer` for `int`, `Double` for `double`).
- **Autoboxing**: Automatic conversion of a primitive type to its corresponding wrapper class object. `Integer i = 10;`
- **Unboxing**: Automatic conversion of a wrapper class object to its corresponding primitive type. `int val = i;`

**Use Cases:**
- Storing primitives in collections that require objects (e.g., `ArrayList<Integer>`).
- Using primitives with generic types.

**Potential Issues:**
- **Performance**: Object creation can be slower than using primitives directly.
- **`NullPointerException`**: Unboxing a `null` wrapper object will throw a `NullPointerException`. `Integer num = null; int n = num; // Throws NullPointerException`

## 12. Generics
Generics enable types (classes and interfaces) to be parameters when defining classes, interfaces, and methods. This provides compile-time type safety and reduces the need for type casting.

- **Type Parameter**: A placeholder for a specific type, e.g., `T` in `class Box<T> {}`.
- **Instantiation**: `Box<String> stringBox = new Box<>();`
- **Benefits**: Type safety at compile time, code reusability, no need for explicit casts.
- **Cannot use primitive types**: Use wrapper classes instead (autoboxing helps).

**Example: Generic Class**
```java
class Storage<T> {
    private T item;
    public void setItem(T item) { this.item = item; }
    public T getItem() { return item; }

    public static void main(String[] args) {
        Storage<Integer> numStorage = new Storage<>();
        numStorage.setItem(100);
        // numStorage.setItem("Hello"); // Compile-time error
        System.out.println("Item: " + numStorage.getItem());
    }
}
```

### 12.1. Multiple Type Parameters
`class Pair<K, V> { K key; V value; ... }`

### 12.2. Bounded Type Parameters
Restricts the types that can be used as type arguments. Uses `extends` (for classes or interfaces).
- `<T extends Number>`: `T` can be `Number` or any subclass of `Number` (e.g., `Integer`, `Double`).
- `<T extends Runnable>`: `T` must be a type that implements the `Runnable` interface.

**Example: Bounded Type Parameter**
```java
class Stats<T extends Number> {
    T[] nums;
    Stats(T[] o) { nums = o; }
    double average() {
        double sum = 0.0;
        for (T num : nums) sum += num.doubleValue();
        return sum / nums.length;
    }
    public static void main(String[] args) {
        Integer[] iNums = {1, 2, 3, 4, 5};
        Stats<Integer> iStats = new Stats<>(iNums);
        System.out.println("Avg: " + iStats.average()); // Avg: 3.0
        // String[] sNums = {"a", "b"}; // Error: String not a Number
        // Stats<String> sStats = new Stats<>(sNums);
    }
}
```

### 12.3. Generic Interfaces
Interfaces can also be generic. Example: `Comparable<T>`.
```java
interface MinMax<T extends Comparable<T>> {
    T min();
    T max();
}
class MyClass<T extends Comparable<T>> implements MinMax<T> {
    T[] vals;
    MyClass(T[] o) { vals = o; }
    public T min() { /* ... */ return vals[0]; } // Simplified
    public T max() { /* ... */ return vals[0]; } // Simplified
}
```

### 12.4. Generic Methods
Methods can have their own type parameters, independent of any class-level type parameters.
- Type parameter list is placed before the return type: `public static <E> void printArray(E[] elements)`

**Example: Generic Method**
```java
public class GenericMethodDemo {
    public static <E> void printArray(E[] elements) {
        for (E element : elements) System.out.print(element + " ");
        System.out.println();
    }
    public static void main(String[] args) {
        Integer[] intArray = {1, 2, 3};
        String[] stringArray = {"A", "B", "C"};
        printArray(intArray);    // 1 2 3
        printArray(stringArray); // A B C
    }
}
```

### 12.5. Type Erasure
Java generics are implemented using type erasure. Generic type information is present only at compile time and is erased at runtime.
- Type parameters are replaced by their bounds (or `Object` if unbounded).
- Compiler inserts casts where necessary.
- **Limitations**: Cannot create instances of type parameters (`new T()`), cannot create arrays of generic types (`new T[5]`), `instanceof` checks for parameterized types don't work as expected at runtime (`obj instanceof List<String>`).

### 12.6. Type Inference with `var` and Diamond Operator (inspired by `t2.md` Q11)
Java provides type inference features to make generic code more concise:

-   **Diamond Operator (`<>`) (Java 7+):** If the generic type is explicitly declared on the left-hand side of an assignment, you can use an empty set of angle brackets (`<>`) on the right-hand side (the "diamond operator"). The compiler infers the type arguments from the context.
    ```java
    List<String> namesList = new ArrayList<String>(); // Pre-Java 7
    List<String> namesListDiamond = new ArrayList<>(); // Java 7+
    Map<String, List<Integer>> complexMap = new HashMap<>();
    ```

-   **`var` Keyword (Java 10+):** For local variable type inference, `var` can be used if the compiler can infer the type from the initializer expression on the right-hand side.
    ```java
    var messages = new ArrayList<String>(); // messages is ArrayList<String>
    var userScores = new HashMap<String, Integer>(); // userScores is HashMap<String, Integer>

    // Combining var with the diamond operator:
    var inferredObjectList = new ArrayList<>(); // Type of inferredObjectList is ArrayList<Object>
                                              // because no type info for elements on the right.
    var specificStringList = new ArrayList<String>(); // Type is ArrayList<String>
    ```
    When using `var`, ensure the right-hand side provides enough information for the desired type, or be aware it might infer a more general type like `Object`.

**Example: Generic Method with Type Inference**
Consider a generic method:
```java
class GenericUtil {
    static <T> ArrayList<T> selectFromArray(ArrayList<T> data, int[] indices) {
        // Explicit type for 'result' with diamond operator
        ArrayList<T> result = new ArrayList<>();

        // Alternatively, using var (Java 10+):
        // var result = new ArrayList<T>(); // T must be inferable for the list elements

        for (int index : indices) {
            if (index >= 0 && index < data.size()) {
                result.add(data.get(index));
            }
        }
        return result;
    }
    public static void main(String[] args) {
        var numbers = new ArrayList<Integer>();
        numbers.add(10); numbers.add(20); numbers.add(30);
        int[] selection = {0, 2};
        ArrayList<Integer> selectedNumbers = selectFromArray(numbers, selection);
        System.out.println(selectedNumbers); // [10, 30]
    }
}
```

## 13. SOLID Principles
SOLID is an acronym for five design principles intended to make software designs more understandable, flexible, and maintainable.

| Principle                               | Description                                                                                                |
|-----------------------------------------|------------------------------------------------------------------------------------------------------------|
| **S**ingle **R**esponsibility Principle (SRP) | A class should have only one reason to change, meaning it should have only one job or responsibility.        |
| **O**pen/Closed Principle (OCP)         | Software entities (classes, modules, functions) should be open for extension but closed for modification.    |
| **L**iskov **S**ubstitution Principle (LSP) | Subtypes must be substitutable for their base types without altering the correctness of the program.         |
| **I**nterface **S**egregation Principle (ISP) | Clients should not be forced to depend on interfaces they do not use. Prefer smaller, specific interfaces. |
| **D**ependency **I**nversion Principle (DIP)  | High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details; details should depend on abstractions. |

**Example (Illustrating OCP):**
```java
// Violates OCP: Modifying AreaCalculator for new shapes
/*
class AreaCalculator {
    public double calculate(Object shape) {
        if (shape instanceof Circle) return Math.PI * ((Circle)shape).radius * ((Circle)shape).radius;
        if (shape instanceof Square) return ((Square)shape).side * ((Square)shape).side;
        return 0;
    }
}
*/

// Obeys OCP: Extend by adding new Shape implementations
interface Shape { double area(); }
class CircleShape implements Shape {
    double radius; CircleShape(double r) {radius=r;}
    public double area() { return Math.PI * radius * radius; }
}
class SquareShape implements Shape {
    double side; SquareShape(double s) {side=s;}
    public double area() { return side * side; }
}
// To add Triangle, just create TriangleShape implements Shape.
```

## 14. Multi-Threading
Multi-threading allows concurrent execution of two or more parts of a program for maximum CPU utilization, responsiveness, and efficiency.

### 14.1. Creating Threads
There are two main ways to create a thread:

1.  **Extending the `Thread` Class**:
    - Create a class that extends `java.lang.Thread`.
    - Override its `run()` method.
    - Create an instance of the class and call its `start()` method.

    ```java
    class MyThread extends Thread {
        private int id;
        public MyThread(int id) { this.id = id; }
        @Override
        public void run() {
            System.out.println("Thread " + id + " running");
        }
    }
    // To run: new MyThread(1).start();
    ```

2.  **Implementing the `Runnable` Interface**:
    - Create a class that implements `java.lang.Runnable`.
    - Implement the `run()` method.
    - Create an instance of the class, pass it to a `Thread` object's constructor, and call `start()` on the `Thread` object.
    - This is generally preferred as it allows the class to extend other classes.

    ```java
    class MyRunnable implements Runnable {
        private int id;
        public MyRunnable(int id) { this.id = id; }
        @Override
        public void run() {
            System.out.println("Runnable " + id + " running");
        }
    }
    // To run: new Thread(new MyRunnable(1)).start();
    ```

### 14.2. The `join()` Method
The `join()` method waits for a thread to die (finish its execution).
- When `t.join()` is called, the current thread will pause its execution until thread `t` has completed.
- Throws `InterruptedException` if the waiting thread is interrupted.

```java
public class JoinExample {
    public static void main(String[] args) throws InterruptedException {
        Thread t1 = new Thread(() -> {
            System.out.println("T1 started");
            try { Thread.sleep(100); } catch (InterruptedException e) {}
            System.out.println("T1 finished");
        });
        t1.start();
        t1.join(); // Main thread waits for t1 to finish
        System.out.println("Main thread continues after T1");
    }
}
```

### 14.3. Race Conditions
A race condition occurs when multiple threads access shared data concurrently, and the outcome depends on the particular order in which operations are performed. This can lead to unpredictable results.

**Example:**
```java
class Counter {
    private int count = 0;
    public void increment() { count++; } // Not atomic
    public int getCount() { return count; }
}
// If two threads call increment() on the same Counter instance,
// the final count might be less than expected due to lost updates.
// E.g., T1 reads count (0), T2 reads count (0), T1 writes (1), T2 writes (1). Expected: 2.
```

### 14.4. `synchronized` Keyword
Java's `synchronized` keyword provides a locking mechanism to control access to shared resources, preventing race conditions.
- **Synchronized Methods**: When a synchronized method is called, the thread acquires an intrinsic lock on the object (or class if static method).
  ```java
  class SafeCounter {
      private int count = 0;
      public synchronized void increment() { count++; }
      public int getCount() { return count; }
  }
  ```
- **Synchronized Blocks**: Allows synchronization on any object, for a smaller section of code.
  ```java
  public class SyncBlockExample {
      private Object lock = new Object();
      public void performAction() {
          // ... non-critical section ...
          synchronized (lock) {
              // Critical section: only one thread at a time
          }
          // ... non-critical section ...
      }
  }
  ```
Only one thread can hold the lock on a given monitor object at a time.

### 14.5. Deadlock
Deadlock is a situation where two or more threads are blocked forever, each waiting for the other to release a resource.
- Typically occurs when multiple threads need the same set of locks but acquire them in different orders.

**Example Scenario:**
Thread A locks Resource1, then tries to lock Resource2.
Thread B locks Resource2, then tries to lock Resource1.

**Prevention:**
- Acquire locks in a fixed, global order.
- Avoid holding multiple locks if possible.
- Use timeouts for lock acquisition.

### 14.6. Inter-thread Communication
Threads can communicate using `wait()`, `notify()`, and `notifyAll()` methods, which are part of `java.lang.Object`. These methods must be called from within a synchronized context (on the object whose lock is held).

- **`wait()`**: Causes the current thread to release the lock and wait until another thread invokes `notify()` or `notifyAll()` on the same object, or a timeout occurs.
- **`notify()`**: Wakes up a single thread that is waiting on this object's monitor. If multiple threads are waiting, one is chosen arbitrarily.
- **`notifyAll()`**: Wakes up all threads that are waiting on this object's monitor.

**Example: Producer-Consumer**
```java
class SharedBuffer {
    private String data;
    private boolean available = false;

    public synchronized void produce(String item) throws InterruptedException {
        while (available) wait(); // Wait if buffer is full
        data = item;
        System.out.println("Produced: " + item);
        available = true;
        notify(); // Notify consumer
    }
    public synchronized String consume() throws InterruptedException {
        while (!available) wait(); // Wait if buffer is empty
        System.out.println("Consumed: " + data);
        String item = data;
        available = false;
        notify(); // Notify producer
        return item;
    }
}
```

## 15. Anonymous Classes
An anonymous class is a class without a name, defined and instantiated in a single expression. They are useful for creating one-off objects, typically for implementing an interface or extending a class with a small amount of overriding logic.

- **Syntax**: `new SuperType(constructor_args) { // class body }`
  - `SuperType` can be an interface (then it implements it) or a class (then it extends it).

**Example (Implementing an Interface):**
```java
interface Greeter { void greet(); }

public class AnonymousDemo {
    public static void main(String[] args) {
        // Using an anonymous class to implement Greeter
        Greeter englishGreeter = new Greeter() {
            @Override
            public void greet() {
                System.out.println("Hello!");
            }
        };
        englishGreeter.greet(); // Output: Hello!

        // Often used with event listeners or comparators
        java.util.Arrays.sort(new String[]{"c","a","b"}, new java.util.Comparator<String>() {
            public int compare(String s1, String s2) {
                return s1.compareTo(s2);
            }
        });
    }
}
```
- Anonymous classes can access members of their enclosing class and effectively final local variables.

## 16. Lambda Expressions
Lambda expressions provide a concise way to represent an instance of a functional interface (an interface with a single abstract method). They are essentially anonymous functions.

- **Syntax**:
  - `(parameters) -> expression`
  - `(parameters) -> { statements; }`
  - `() -> expression` (no parameters)

**Key Features:**
- **Type Inference**: Compiler can often infer parameter types.
- **Conciseness**: Reduces boilerplate code compared to anonymous classes.
- **Functional Interfaces**: Can only be used with functional interfaces (e.g., `Runnable`, `Comparator`, `ActionListener`). `@FunctionalInterface` annotation can be used.

**Example (Replacing Anonymous Class with Lambda):**
```java
import java.util.Arrays;
import java.util.Comparator;

public class LambdaDemo {
    public static void main(String[] args) {
        String[] names = {"Charlie", "Alice", "Bob"};

        // Using an anonymous class for Comparator
        Comparator<String> anonComp = new Comparator<String>() {
            @Override
            public int compare(String s1, String s2) {
                return s1.compareTo(s2);
            }
        };
        Arrays.sort(names, anonComp); // Sorts with anonymous class

        // Using a lambda expression for Comparator
        // Arrays.sort(names, (s1, s2) -> s1.compareTo(s2)); // Sorts with lambda
        // For clarity, assign to variable first:
        Comparator<String> lambdaComp = (s1, s2) -> s1.compareTo(s2);
        Arrays.sort(names, lambdaComp);
        System.out.println(Arrays.toString(names)); // [Alice, Bob, Charlie]
    }
}
```
- If a lambda body has a single expression, its result is implicitly returned.
- If it has multiple statements, they must be enclosed in `{}` and `return` must be explicit if a value is returned.

## 17. Javadoc
Javadoc is a documentation generator created by Sun Microsystems for the Java language (now Oracle Corporation) for generating API documentation in HTML format from Java source code.

- **Comments**: Javadoc comments start with `/**` and end with `*/`.
- **Placement**: Placed immediately before class, interface, method, or field declarations.
- **Tags**: Special keywords prefixed with `@` to provide specific information.

**Common Javadoc Tags:**
| Tag           | Description                                       | Context         |
|---------------|---------------------------------------------------|-----------------|
| `@author`     | Author of the code.                               | Class, Interface|
| `@version`    | Version of the code.                              | Class, Interface|
| `@param`      | Describes a method parameter.                     | Method          |
| `@return`     | Describes the return value of a method.           | Method          |
| `@throws`     | Describes an exception that a method may throw.   | Method          |
| `@see`        | Creates a link to other Javadoc documentation.    | All             |
| `@since`      | Indicates when the feature was introduced.        | All             |
| `@deprecated` | Marks a feature as deprecated.                    | All             |

**Example:**
```java
/**
 * Represents a simple calculator.
 * @author Copilot
 * @version 1.0
 */
public class Calculator {
    /**
     * Adds two integers.
     *
     * @param a The first integer.
     * @param b The second integer.
     * @return The sum of a and b.
     */
    public int add(int a, int b) {
        return a + b;
    }
}
```

**Generating Javadoc:**
Use the `javadoc` command-line tool:
`javadoc [options] [packagenames] [sourcefiles]`
Example: `javadoc -d doc_output com.example.MyClass.java`
This generates HTML documentation in the `doc_output` directory.

## 18. Comparable vs Comparator

| Feature          | Comparable                                  | Comparator                                    |
|------------------|---------------------------------------------|-----------------------------------------------|
| **Purpose**      | Natural ordering of objects.                 | Custom ordering of objects.                   |
| **Method**       | `int compareTo(T o)`                        | `int compare(T o1, T o2)`                    |
| **Implementation**| Class implements `Comparable<T>`.          | Separate class implements `Comparator<T>`.   |
| **Sorting**      | `Collections.sort(list)` uses `compareTo`. | `Collections.sort(list, comparator)` uses `compare`. |

**Example: Comparable**
```java
class Student implements Comparable<Student> {
    int id; String name;
    // Constructor...
    public int compareTo(Student s) {
        return this.name.compareTo(s.name); // Sort by name
    }
}
```

**Example: Comparator**
```java
class Student {
    int id; String name;
    // Constructor...
}
class SortById implements Comparator<Student> {
    public int compare(Student s1, Student s2) {
        return s1.id - s2.id; // Sort by id
    }
}
```
**Note on `Double.compareTo()` (inspired by `t2.md` Q1):**
The `compareTo` method in wrapper classes like `Double` (and other `Number` subclasses that implement `Comparable`) follows the standard `Comparable` contract:
-   `x.compareTo(y)` returns:
    -   `0` if `x` is numerically equal to `y`.
    -   A value less than `0` if `x` is numerically less than `y`.
    -   A value greater than `0` if `x` is numerically greater than `y`.
This is essential for sorting numerical data or using these objects in ordered collections like `TreeSet` or `TreeMap`.

```java
// Example: Finding the minimum value in an array of Doubles
public class MinDoubleFinder {
    static Double findMinimum(Double[] values) {
        if (values == null || values.length == 0) {
            throw new IllegalArgumentException("Input array cannot be null or empty.");
        }
        Double minimumValue = values[0];
        for (int i = 1; i < values.length; i++) {
            if (values[i] != null && minimumValue.compareTo(values[i]) > 0) {
                // if minimumValue is greater than values[i]
                minimumValue = values[i]; // update minimumValue to the smaller value
            }
        }
        return minimumValue;
    }
    public static void main(String[] args) {
        Double[] data = {3.14, 1.618, 2.718, 0.577};
        System.out.println("Minimum: " + findMinimum(data)); // Minimum: 0.577
    }
}
```

