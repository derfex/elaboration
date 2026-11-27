# Task for learning Angular

[Translation to Russian](README-ru.md)

## User story

As a buyer on a website, I want to see the entire list of products with prices, select several items and add to an order to make a purchase.
There should be an option to edit the order.

## Details

API:
https://ssdev.superagent.ru/TestApp/swagger/#/Values

## Acceptance criteria

* [x] The page displays a table with products, columns: selected (checkbox), category (`category`), product (`name`), price (`price`).
* [x] A user can select multiple rows by checking the box in the table.
* [x] After clicking the “Add to cart” button, the selected items are no longer displayed in the product list.
* [x] It should be possible to select products by a specific category.
* [x] It should be possible to set sorting by: alphabetically (product name), by price (ascending/descending).
* [x] Products added to an order can be viewed in the cart.
* [x] It should be possible to remove products from the order in the cart
  (the mechanism for removing products is similar to the mechanism for adding products to the order).
* [x] Use `@angular/material` or `ng-bootstrap` for styling.
