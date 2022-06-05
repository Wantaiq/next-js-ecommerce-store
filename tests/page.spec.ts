import { expect, test } from '@playwright/test';

const baseUrl = 'http://localhost:3000';
test('basic page interaction test', async ({ page }) => {
  function calculateTotalPrice(
    firstItem: string | number,
    secondItem: string | number,
    firstItemQuantity: number,
    secondItemQuantity: number,
  ) {
    const convertFirstParamToNumber = Number(firstItem);
    const convertSecondParamToNumber = Number(secondItem);
    const total =
      convertFirstParamToNumber * firstItemQuantity +
      convertSecondParamToNumber * secondItemQuantity;
    return total.toString();
  }
  const singleProductsLocators = {
    price: 'data-test-id=product-price',
    img: 'data-test-id=product-image',
    quantity: 'data-test-id=product-quantity',
    addToCart: 'data-test-id=product-add-to-cart',
  };
  const cartLocators = {
    item: 'data-test-id=cart-product-', // item slug
    itemQuantity: 'data-test-id=cart-product-quantity-', // item slug
    removeButton: 'data-test-id=cart-product-remove-', // item slug
    totalPrice: 'data-test-id=cart-total',
    checkoutButton: 'data-test-id=checkout',
  };

  const checkoutLocators = {
    email: 'data-test-id=checkout-email',
    firstName: 'data-test-id=checkout-first-name',
    lastName: 'data-test-id=checkout-last-name',
    country: 'data-test-id=checkout-country',
    city: 'data-test-id=checkout-city',
    address: 'data-test-id=checkout-address',
    postalCode: 'data-test-id=checkout-postal-code',
    creditCard: 'data-test-id=checkout-credit-card',
    expirationDate: 'data-test-id=checkout-expiration-date',
    securityCode: 'data-test-id=checkout-security-code',
    confirmOrderButton: 'data-test-id=checkout-confirm-order',
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
  await page.locator('button:has-text("Accept All")').click();
  await page.locator(headerLocators.productsLink).click();
  await page.waitForNavigation({ url: urls.products });
  await page.locator('a[data-test-id=product-eat-beautiful]').click();
  await page.waitForNavigation({ url: `${urls.products}/eat-beautiful` });
  await expect(page.locator(singleProductsLocators.img)).toBeVisible();
  await expect(page.locator(singleProductsLocators.quantity)).toBeVisible();
  await expect(page.locator(singleProductsLocators.quantity)).toHaveText(/1/);
  await expect(page.locator(singleProductsLocators.price)).toBeVisible();
  const firstItemPrice = await page
    .locator(singleProductsLocators.price)
    .innerText();
  await expect(page.locator(singleProductsLocators.addToCart)).toBeVisible();
  await page.locator(singleProductsLocators.addToCart).click();
  await expect(page.locator(headerLocators.cartCount)).toHaveText(/1/);
  await page.locator(singleProductsLocators.addToCart).click();
  await expect(page.locator(headerLocators.cartCount)).toHaveText(/2/);
  await page.locator(headerLocators.productsLink).click();
  await page.waitForNavigation({ url: urls.products });
  await page.locator('a[data-test-id=product-your-soul-is-a-river]').click();
  await page.waitForNavigation({
    url: `${urls.products}/your-soul-is-a-river`,
  });
  await expect(page.locator(singleProductsLocators.img)).toBeVisible();
  await expect(page.locator(singleProductsLocators.quantity)).toBeVisible();
  await expect(page.locator(singleProductsLocators.quantity)).toHaveText(/1/);
  await expect(page.locator(singleProductsLocators.price)).toBeVisible();
  const secondItemPrice = await page
    .locator(singleProductsLocators.price)
    .innerText();
  await expect(page.locator(singleProductsLocators.addToCart)).toBeVisible();
  await page.locator(singleProductsLocators.addToCart).click();
  await expect(page.locator(headerLocators.cartCount)).toHaveText(/3/);
  await page.locator(headerLocators.cartLink).click();
  await page.waitForNavigation({ url: urls.cart });
  await expect(page.locator(`${cartLocators.item}eat-beautiful`)).toBeVisible();
  await expect(
    page.locator(`${cartLocators.itemQuantity}eat-beautiful`),
  ).toBeVisible();
  await expect(
    page.locator(`${cartLocators.itemQuantity}eat-beautiful`),
  ).toHaveText(/2/);
  await expect(
    page.locator(`${cartLocators.removeButton}eat-beautiful`),
  ).toBeVisible();
  await expect(page.locator(cartLocators.totalPrice)).toBeVisible();
  await expect(
    page.locator(`${cartLocators.item}your-soul-is-a-river`),
  ).toBeVisible();
  await expect(
    page.locator(`${cartLocators.itemQuantity}your-soul-is-a-river`),
  ).toHaveText(/1/);
  await expect(
    page.locator(`${cartLocators.removeButton}your-soul-is-a-river`),
  ).toBeVisible();
  await expect(page.locator(cartLocators.totalPrice)).toHaveText(
    calculateTotalPrice(firstItemPrice, secondItemPrice, 2, 1),
  );
  await page.locator(`${cartLocators.removeButton}eat-beautiful`).click();
  await expect(page.locator(headerLocators.cartCount)).toHaveText(/1/);
  await expect(
    page.locator(`${cartLocators.item}eat-beautiful`),
  ).not.toBeVisible();
  await expect(
    page.locator(`${cartLocators.itemQuantity}eat-beautiful`),
  ).not.toBeVisible();
  await expect(
    page.locator(`${cartLocators.removeButton}eat-beautiful`),
  ).not.toBeVisible();
  await expect(page.locator(cartLocators.totalPrice)).toHaveText(
    secondItemPrice,
  );
  await page.locator(cartLocators.checkoutButton).click();
  await page.waitForNavigation({ url: urls.checkout });
  await page.type(checkoutLocators.email, 'John Doe');
  await page.type(checkoutLocators.firstName, 'John');
  await page.type(checkoutLocators.lastName, 'Doe');
  await page.type(checkoutLocators.country, 'Austria');
  await page.type(checkoutLocators.city, 'Vienna');
  await page.type(checkoutLocators.address, 'Some random address 16');
  await page.type(checkoutLocators.postalCode, '1010');
  await page.type(checkoutLocators.creditCard, '4242 4242 4242 4242');
  await page.type(checkoutLocators.expirationDate, '1225');
  await page.type(checkoutLocators.securityCode, '213');
  await page.keyboard.press('Enter');
  await expect(page.locator('data-test-id=error-email')).toHaveText(
    /Please enter valid email/,
  );
  await page.fill(checkoutLocators.email, '');
  await page.type(checkoutLocators.email, 'johndoe@johndoe.com');
  await expect(page.locator('data-test-id=error-email')).not.toBeVisible();
  await page.keyboard.press('Enter');
  await page.waitForNavigation({ url: urls.thankYouPage });
  await expect(page.locator('h1')).toHaveText(/Thank you for your order/);
});
