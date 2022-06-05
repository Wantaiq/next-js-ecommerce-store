import { expect, test } from '@playwright/test';

const baseUrl = 'http://localhost:3000';

test.only('adding, and removing items from cart test', async ({ page }) => {
  const singleProductsLocators = {
    price: 'data-test-id=product-price',
    img: 'data-test-id=product-image',
    quantity: 'data-test-id=product-quantity',
    addToCart: 'data-test-id=product-add-to-cart',
    incrementQuantity: 'data-test-id=increment',
    decrementQuantity: 'data-test-id=decrement',
  };
  const cartLocators = {
    item: 'data-test-id=cart-product-', // item slug
    itemQuantity: 'data-test-id=cart-product-quantity-', // item slug
    removeButton: 'data-test-id=cart-product-remove-', // item slug
    totalPrice: 'data-test-id=cart-total',
    checkoutButton: 'data-test-id=checkout',
  };
  const headerLocators = {
    cartLink: 'data-test-id=cart-link',
    cartCount: 'data-test-id=cart-count',
    productsLink: 'data-test-id=products-link',
  };

  const urls = {
    cart: `${baseUrl}/cart`,
    checkout: `${baseUrl}/checkout`,
    products: `${baseUrl}/products`,
    thankYouPage: `${baseUrl}/thank-you`,
  };
  await page.goto(baseUrl);
  await page.locator(headerLocators.productsLink).click();
  await page.waitForNavigation({ url: urls.products });
  await page.locator('a[data-test-id=product-eat-beautiful]').click();
  await page.waitForNavigation({ url: `${urls.products}/eat-beautiful` });
  await page.locator(singleProductsLocators.addToCart).click();
  await expect(page.locator(headerLocators.cartCount)).toHaveText(/1/);
  await page.locator(singleProductsLocators.incrementQuantity).click();
  await page.locator(singleProductsLocators.incrementQuantity).click();
  await page.locator(singleProductsLocators.incrementQuantity).click();
  await page.locator(singleProductsLocators.addToCart).click();
  await expect(page.locator(headerLocators.cartCount)).toHaveText(/5/);
  await page.locator(headerLocators.cartLink).click();
  await page.waitForNavigation({ url: urls.cart });
  await expect(
    page.locator(`${cartLocators.itemQuantity}eat-beautiful`),
  ).toBeVisible();
  await expect(
    page.locator(`${cartLocators.itemQuantity}eat-beautiful`),
  ).toHaveText(/5/);
  await page.locator(headerLocators.productsLink).click();
  await page.waitForNavigation({ url: urls.products });
  await page.locator('a[data-test-id=product-your-soul-is-a-river]').click();
  await page.waitForNavigation({
    url: `${urls.products}/your-soul-is-a-river`,
  });
  await page.locator(singleProductsLocators.incrementQuantity).click();
  await page.locator(singleProductsLocators.incrementQuantity).click();
  await page.locator(singleProductsLocators.incrementQuantity).click();
  await page.locator(singleProductsLocators.addToCart).click();
  await expect(page.locator(headerLocators.cartCount)).toHaveText(/9/);
  await page.locator(headerLocators.cartLink).click();
  await page.waitForNavigation({ url: urls.cart });
  await expect(
    page.locator(`${cartLocators.itemQuantity}your-soul-is-a-river`),
  ).toBeVisible();
  await expect(
    page.locator(`${cartLocators.itemQuantity}your-soul-is-a-river`),
  ).toHaveText(/4/);
  await page.locator(`${cartLocators.removeButton}eat-beautiful`).click();
  await expect(page.locator(headerLocators.cartCount)).toHaveText(/4/);
});
