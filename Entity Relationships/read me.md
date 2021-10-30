# Relationship types in ORM

* The main goal is to fetch **entities** and create **aggregates**.
* When creating an aggregate, the initial entity is the **root**.
* The **fetched entities** are **loaded into the root**.
* From the perspective of the root, all **relationships** are either **one-to-one** or **one-to-many**.
* The loaded entity in a **one-to-one relationship** can be thought of as **a part that completes** the root.
* Loaded entities in a **one-to-many relationship** can be thought as **children of** the root.
* Being a **part** and being a **children** are not the same.

## One-to-one Relationship

This can be done in two ways: **(1)** root knows the part, and **(2)** part knows the root.

### 1. Root knows the part

*One entity depends on an independent entity. Dependent needs to know about the target entity.*

Example: One product has only one unit.

Tables:

* `products (id, name, unit_id)`
* `units (id, name)`

SQL:

```sql
SELECT * FROM units WHERE id = [products.unit_id]
```

---

*There's a **special case**. There might be **multiple types of the part**. When this is the case, root also needs to **know the type**.*

Example: User types (and Class Table Inheritance).

Tables:

* `users (id, display_name, type, type_id)`
* `admins (id, name)`
* `customers (id, title)`

SQL:

```sql
SELECT * FROM [users.type] WHERE id = [users.type_id]
```

### 2. Part knows the root

*A single entity is separated into two.*

Example: One quote has one amounts (data).

Tables:

* `quotes (id, title)`
* `quotes_amounts (id, quote_id, subtotal, tax, grandtotal)`

SQL:

```sql
SELECT * FROM quote_amounts WHERE quote_id = [quotes.id]
```

## One-to-many Relationships

This can also be done in two ways: **(1)** two tables, and **(2)** three tables.

### 1. Two tables

*One entity has multiple child entities. Child entities know about the root/parent and depend on it.*

*This is similar to "2. Part knows the root" from "One-to-one Relationship"; only that there are multiple parts/children.*

Example: One product has multiple attributes.

Tables:

* `products (id, name)`
* `product_attributes (id, product_id, name, value)`

SQL:

```sql
SELECT * FROM product_attributes WHERE product_id = [products.id]
```

### 2. Three tables

*This forms a many-to-many relationship in the database. Both entities can be used as the root.*

Example: Departments & Employees

Tables:

* `departments (id, name)`
* `employees (id, name)`
* `department_employees (department_id, employee_id)`

SQL (department is the root):

```sql
SELECT employees.*
FROM department_employees
LEFT JOIN employees ON employees.id = department_employees.employee_id
WHERE department_employees.department_id = [departments.id]
```

SQL (employee is the root):

```sql
SELECT departments.*
FROM department_employees
LEFT JOIN departments ON departments.id = department_employees.department_id
WHERE department_employees.employee_id = [employees.id]
```

# Summary

There are three types of SQL queries that need to be build to populate a root to form an aggerate.

1. Root entity knows about the part/referenced entity (**one-to-one**)

```sql
SELECT * FROM [ref_table] WHERE id = [base_table.foreign_key]
```

2. The part knows about the root (**one-to-one** or **one-to-many**)

```sql
SELECT * FROM [ref_table] WHERE [ref_table.foreign_key] = [base_table.primary_key]
```

3. Both the root and the part know about each other in a third/associative table (**one-to-many**)

```sql
SELECT [table_b.*]
FROM [assoc_table_ab]
LEFT JOIN [table_b] ON [table_b.primary_key] = [assoc_table_ab.table_b_pk]
WHERE assoc_table_ab.table_a_pk = [table_a.primary_key]
```

<table>
    <tr>
        <td>$product->load("unit")</td>
        <td>
        SELECT * FROM units WHERE id = [products.unit_id]
        </td>
    </tr>
    <tr>
        <td>$quote->load("amounts")</td>
        <td>
        SELECT * FROM quote_amounts WHERE quote_id = [quote.id]
        </td>
    </tr>
    <tr>
        <td>$product->load("attributes")</td>
        <td>
        SELECT * FROM product_attributes WHERE product_id = [products.id]
        </td>
    </tr>
    <tr>
        <td>$department->load("employees")</td>
        <td>
> SELECT app_employees.* FROM app_employees <br>
> JOIN app_department_employees ON app_department_employees.employee_id = app_employees.id <br>
> WHERE app_department_employees.department_id = '14'
        </td>
    </tr>
</table>




