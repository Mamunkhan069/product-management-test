## Readme Top

<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">Product-Management</h3>

  <p align="center">
    Developer Guide To Start The Project!
  </p>
</div>

<!-- Local Environment Setup -->

# Local Environment Setup

### Install

1. git
2. vs code
3. Node
4. pnpm

<!--Project Env Variables-->

<!-- Start Application -->

# Start Application

To start the application run the following instraction and command

```
1. Create a database into mySQL which name is "productmanagement"
2. then run the command for create tables
    $ node seeder
3. for start the project run this command
    $ pnpm start

```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Route details

```
1. User
    >Login
        > Post method: http://localhost:3000/users/login
            > required Field
                {
                    "email": "admin@ecommerce.com",
                    "password": "P@ssword123"
                }

    >create
        > post method: http://localhost:3000/users
            > required Field
                {
                    "firstName": "demo",
                    "lastName": "demo",
                    "email": "demo@gmail.com",
                    "password": "12345678",
                    "confirmPassword":"12345678"

                }
    >getAll
        > get method: http://localhost:3000/users

    -for getsingle
        > get method: http://localhost:3000/users/user_id

    -for update
        > patch method: http://localhost:3000/users/user_id
            > type : form-data
            > required Field
                {
                    "firstName": "demo",
                    "lastName": "demo",

                }
    -for delete
        > delete method: http://localhost:3000/users/user_id

```

```
2. category ( Atfirst you need to login for authentication
                "email":    "admin@ecommerce.com",
                 "password": "P@ssword123")
    -for create
        > Post method: http://localhost:3000/categories
            > type : form-data
            > required Field
                - name
                - description
                - image
                - status(0/1)
    -for getAll
        > get method: http://localhost:3000/categories

    -for getsingle
        > get method: http://localhost:3000/categories/givecategories_id

    -for update
        > patch method: http://localhost:3000/categories/givecategories_id
            > type : form-data
            > required Field
                - name
                - description
                - image
                - status(0/1)
    -for delete
        > delete method: http://localhost:3000/categories/givecategories_id

```

```
4. product ( Atfirst you need to login for authentication)
    -for create
        > Post http://localhost:3000/product
            > type : form-data
            > required Field
                - sub_cat_id(form subcategories table)
                - product_code
                - name
                - description
                - images(you can upload maximum 3 images)
                - brand_id(from brand table)
                - color_id(from color table)
                - size_id(from size table)
                - price
                - discount
                -status(0/1)
    -for getAll
        > get method: http://localhost:3000/product

    -for getsingle
        > get method: http://localhost:3000/product/product_id

    -for update
        > patch method: http://localhost:3000/product/product_id
            > type : form-data
            > type : form-data
            > required Field
                - sub_cat_id(form subcategories table)
                - product_code
                - name
                - description
                - images(you can upload maximum 3 images)
                - brand_id(from brand table)
                - color_id(from color table)
                - size_id(from size table)
                - price
                - discount
                -status(0/1)
    -for delete
        > delete method: http://localhost:3000/product/product_id

```

```
>>Get all products by category
    >Get method: http://localhost:3000/categories/product/:givecategoriyid

>>Get all products by status
    >Get method:  http://localhost:3000/product/status/:givestatus
>>>>Search all products
    >Get method: http://localhost:3000/product/search/:searchquery
```

```
5. brand ( Atfirst you need to login for authentication)
    -for create
        > Post method: http://localhost:3000/brand/
            > required Field
                {
                    "name": "demo",
                    "status": "1"
                }
    -for getAll
        > get method: http://localhost:3000/brand/

    -for getsingle
        > get method: http://localhost:3000/brand/brand_id

    -for update
        > patch method: http://localhost:3000/brand/brand_id
            > required Field
                {
                    "name": "demo",
                    "status": "1"
                }
    -for delete
        > delete method: http://localhost:3000/brand/brand_id

```

```
6. color ( Atfirst you need to login for authentication)
    -for create
        > Post method: http://localhost:3000/color
            > required Field
                {
                    "name": "demo",
                    "status": "1"
                }
    -for getAll
        > get method: http://localhost:3000/color

    -for getsingle
        > get method: http://localhost:3000/color/color_id

    -for update
        > patch method: http://localhost:3000/color/color_id
            > required Field
                {
                    "name": "demo",
                    "status": "1"
                }
    -for delete
        > delete method: http://localhost:3000/color/color_id

```

```
6. size ( Atfirst you need to login for authentication)
    -for create
        > Post method: http://localhost:3000/size
            > required Field
                {
                    "name": "demo",
                    "status": "1"
                }
    -for getAll
        > get method: http://localhost:3000/size

    -for getsingle
        > get method: http://localhost:3000/size/size_id

    -for update
        > patch method: http://localhost:3000/size/size_id
            > required Field
                {
                    "name": "demo",
                    "status": "1"
                }
    -for delete
        > delete method: http://localhost:3000/size/size_id

```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Git Commit Message Guideline And Git Flow -->

# Git Commit Message Guideline And Git Flow

### Step 1. Prepend Trello card name with '\_' on commit message

> (e.g. Card name: Message Subject).

### Step 2. Follow standard seven rules ( first three are mandatory) of commit message:

1. **_Subject line will be capital letter format_**
2. **_Use the imperative pattern in the subject line_**
3. **_Do not end the subject line with a period_**
4. Separate subject from body with a blank line
5. Limit the subject line to 50 characters
6. Wrap the body at 72 characters
7. Use the body to explain what and why vs. how

> Example: login: Add Attribution Field for Marketing Channel Analysis

### Guideline for WIP 🚧 (working in progress)

**_If you are committing a work in progress, for which, you cannot come up a better name, don’t just commit WIP.
Instead, think what you would commit if the work was completed, and add (WIP) after it. Like -_**

> login: Add Login Api

## Branch naming convention:

1. Initial part will be as it is as per branch purpose (purpose example: "feature", "hotfix", "poc", "bugfix")
2. Then put a "/"
3. Then put Your name
4. Then Put a "-"
5. Then put the branch name with only hypen convention, no blankspace or underscore. Put the card name with '-' just after "/". (example: feature/Habib-Change-Password)

```
> Example: feature/Mamun-login, feature/Riyad-service-management , hotfix/tareq-wrong-otp-count, poc/Fahad-role-base-authentication,
> bugfix/Emon-typo-in-tnc
```

#### Extra Note: Periodically clean up dead branch (created by you)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# GIT Commands

```
$ git pull --rebase origin <branch-name> (for pull)
$ git push --force-with-lease origin <branch-name> (for push)
$ git fetch (when you want to fetch everything from remote repository)
$ git rebase origin/<branch-name>
$ git switch <branch-name> (when you want to switch branch from one to another)
$ git branch <branch-name> (branch-name will be created locally)
$ git branch (to list all the branches)
```
