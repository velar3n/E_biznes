describe('template spec', () => {

  it('Should load main page and accept cookies consent', () => {
    cy.visit('https://www.empik.com');

    cy.get('.css-agqsa2-container-container-containerInfo-containerInfo-CookiesConsentsBannerRodoHelper-css').should('exist').and('be.visible');
    cy.get('.css-1u48hnv-title-title-1').should('have.text', 'Prywatność Użytkownika');
    cy.get('.css-1ms9f4c-content-content-1').should('contain.text', 'pliki cookies');
    cy.get('button[data-ta="cookie-btn-accept-all"]').should('exist').and('be.visible').and('contain.text', 'Zaakceptuj zgody');
    cy.get('button[data-ta="cookie-btn-accept-all"]:visible').click();
    cy.get('.css-agqsa2-container-container-containerInfo-containerInfo-CookiesConsentsBannerRodoHelper-css').should('not.exist');
  });

  it('Should navigate to regulamin from footer', () => {
    cy.visit('https://www.empik.com');
    cy.scrollTo('bottom');
    cy.get('footer').within(() => {
      cy.contains('a', 'Regulamin empik.com')
        .should('have.attr', 'href', '/regulamin')
        .click();
    });
    cy.url().should('include', '/regulamin');
  });

  it('Should move to login page', () => {
    cy.visit('https://www.empik.com');
    cy.get('button[data-ta="cookie-btn-accept-all"]:visible').click({ force: true });
    cy.get('a#simple-dropdown2').should('be.visible').click();
    cy.url().should('include', '/logowanie');
    cy.contains('Zaloguj się').should('be.visible');
  });

  it('Should navigate to the registration page from login page', () => {
    cy.visit('https://www.empik.com/logowanie');
    cy.get('button[data-ta="cookie-btn-accept-all"]:visible').click({ force: true });
    cy.get('a[data-ta="caf-login-form-go-to-registration"]').click();
    cy.url().should('include', '/rejestracja');
    cy.contains('h3', 'Załóż nowe konto').should('be.visible');
  });

  it('Should return no search results for "sesqrf4wrfeasdfwaerwaqerf"', () => {
    cy.visit('https://www.empik.com');
    cy.get('button[data-ta="cookie-btn-accept-all"]:visible').click({ force: true });
    cy.get('.empikHeader__search form')
      .should('be.visible')
      .within(() => {
        cy.get('input[type="search"][placeholder="Wpisz czego szukasz"]').type('sesqrf4wrfeasdfwaerwaqerf');
        cy.root().submit();
      });
    cy.url().should('include', 'szukaj');
    cy.url().should('include', 'sesqrf4wrfeasdfwaerwaqerf');
    cy.get('.empty-result').should('be.visible');
  });

  it('Should search for "karty" from the main page', () => {
    cy.visit('https://www.empik.com');
    cy.get('button[data-ta="cookie-btn-accept-all"]:visible').click({ force: true });
    cy.get('.empikHeader__search form').should('be.visible').within(() => {
      cy.get('input[type="search"][placeholder="Wpisz czego szukasz"]').type('karty');
      cy.root().submit();
    });
    cy.url().should('include', 'szukaj');
    cy.url().should('include', 'karty');
  });

  it('Should set category after search', () => {
    cy.visit('https://www.empik.com/szukaj/produkt?q=karty&qtype=basicForm');
    cy.get('button[data-ta="cookie-btn-accept-all"]:visible').click({ force: true });
    cy.get('.filters__group.js-category-facet').should('be.visible');
    cy.get('.filters__group.js-category-facet').contains('Zabawki').click();
    cy.url().should('include', 'zabawki');
  });

  it('Should set free delivery after search', () => {
    cy.visit('https://www.empik.com/szukaj/produkt?q=karty&qtype=basicForm');
    cy.get('button[data-ta="cookie-btn-accept-all"]:visible').click({ force: true });
    cy.get('#f-1').should('be.visible');
    cy.get('input#freeDeliveryfreedeliverypremium').check({ force: true });
    cy.get('.rwd-buttons-inner .ta-show-results-btn').should('be.visible').click();
    cy.url().should('include', 'freeDelivery=freedeliverypremium');
  }); 

  it('Should click the first product in the search results', () => {
    cy.visit('https://www.empik.com/szukaj/produkt?q=karty&qtype=basicForm');
    cy.get('button[data-ta="cookie-btn-accept-all"]:visible').click({ force: true });
    cy.get('.js-search-content').should('be.visible');
    cy.get('.js-search-content .search-list-item').first().find('a.seoTitle').invoke('removeAttr', 'target').click();
    cy.url().should('include', '-p');
    cy.get('h1').should('be.visible');
  });  

  it('Should add product to cart', () => {
    cy.visit('https://www.empik.com/u-s-playing-card-company-bicycle-bridge-size-karty-u-s-playing-card-company,p1076039963,zabawki-p');
    cy.get('button[data-ta="cookie-btn-accept-all"]:visible').click({ force: true });
    cy.get('button[data-ta="add-to-cart-btn"].css-1dzcvhq-ButtonStyles-AddToCartButtonStyles-addToCartBtn-Button').click();
    cy.get('div[data-ta-section="DrawerDesktop"]', { timeout: 5000 }).should('be.visible');
    cy.get('h3.drawer-desktop-header-title').should('contain.text', 'Dodano przedmiot do koszyka');
  });

  it('Should navigate to cart', () => {
    cy.visit('https://www.empik.com');
    cy.get('button[data-ta="cookie-btn-accept-all"]:visible').click({ force: true });
    cy.get('a#simple-dropdown2').should('be.visible')
    cy.get('li.empikNav__userLink--cart a[href="/cart/"]').click();
    cy.url().should('include', '/cart/');
  });

  it('Should add one of given product in cart', () => {
    cy.visit('https://www.empik.com/u-s-playing-card-company-bicycle-bridge-size-karty-u-s-playing-card-company,p1076039963,zabawki-p');
    cy.get('button[data-ta="cookie-btn-accept-all"]:visible').click({ force: true });
    cy.get('button[data-ta="add-to-cart-btn"].css-1dzcvhq-ButtonStyles-AddToCartButtonStyles-addToCartBtn-Button').click();

    cy.visit('https://www.empik.com/cart/');
    cy.get('a[data-ta="quantity-add"]').click();
    cy.get('input[data-ta="quantity-number"]').should('have.value', '2');
  });

  it('Should remove one of given product in cart', () => {
    cy.visit('https://www.empik.com/u-s-playing-card-company-bicycle-bridge-size-karty-u-s-playing-card-company,p1076039963,zabawki-p');
    cy.get('button[data-ta="cookie-btn-accept-all"]:visible').click({ force: true });
    cy.get('button[data-ta="add-to-cart-btn"].css-1dzcvhq-ButtonStyles-AddToCartButtonStyles-addToCartBtn-Button').click();

    cy.visit('https://www.empik.com/cart/');
    cy.get('input[data-ta="quantity-number"]').clear().type('2').should('have.value', '2');
    cy.get('a[data-ta="quantity-remove"]').click();
    cy.get('input[data-ta="quantity-number"]').should('have.value', '1');
  });

  it('Should remove whole product from cart', () => {
    cy.visit('https://www.empik.com/u-s-playing-card-company-bicycle-bridge-size-karty-u-s-playing-card-company,p1076039963,zabawki-p');
    cy.get('button[data-ta="cookie-btn-accept-all"]:visible').click({ force: true });
    cy.get('button[data-ta="add-to-cart-btn"].css-1dzcvhq-ButtonStyles-AddToCartButtonStyles-addToCartBtn-Button').click();

    cy.visit('https://www.empik.com/cart/');
    cy.get('a[data-ta="quantity-remove"]').click();
    cy.get('div.css-ndkvgn-emptyCart', { timeout: 5000 }).should('be.visible')
  });

  it('Should navigate to contact page', () => {
    cy.visit('https://www.empik.com');
    cy.get('button[data-ta="cookie-btn-accept-all"]:visible').click({ force: true });
    cy.get('a[href="/pomoc/kontakt"][title="Kontakt"]').should('be.visible').click();
    cy.url().should('include', '/pomoc/kontakt');
    cy.contains('h1, h2', 'Formularz kontaktowy').should('be.visible');
  });

  it('Should validate missing fields in contact form', () => {
    cy.visit('https://www.empik.com/pomoc/kontakt');
    cy.get('button[data-ta="cookie-btn-accept-all"]:visible').click({ force: true });
    cy.contains('li.css-1y311ys', 'Oferta produktowa').click();
    cy.contains('li.css-1y311ys', 'Dostępność produktu').click();
    cy.get('form.css-aau3in-formContainer').should('be.visible');
    cy.get('form.css-aau3in-formContainer').within(() => {
      cy.get('button[type="submit"]').click();
    });

    cy.get('form.css-aau3in-formContainer').within(() => {
      cy.get('div.css-kxhnk8').eq(0).find('p.css-cx8kte-errorMessage').should('be.visible').and('contain.text', 'To pole jest wymagane');
      cy.get('div.css-kxhnk8').eq(1).find('p.css-cx8kte-errorMessage').should('be.visible').and('contain.text', 'To pole jest wymagane');
      cy.get('div.css-8v2p8k').find('p.css-cx8kte-errorMessage').should('be.visible').and('contain.text', 'To pole jest wymagane');
    });
  });

  it('Should have correct Facebook link in footer', () => {
    cy.visit('https://www.empik.com');
    cy.get('button[data-ta="cookie-btn-accept-all"]:visible').click({ force: true });
    cy.get('ul.empikFooter__social a[title="Facebook"]')
      .should('have.attr', 'href', 'https://www.facebook.com/empikcom')
      .and('have.attr', 'target', '_blank');
  });

  it('Should have correct Twitter link in footer', () => {
    cy.visit('https://www.empik.com');
    cy.get('button[data-ta="cookie-btn-accept-all"]:visible').click({ force: true });
    cy.get('ul.empikFooter__social a[title="Twitter"]')
      .should('have.attr', 'href', 'https://twitter.com/empik')
      .and('have.attr', 'target', '_blank');
  });

  it('Should have correct Instagram link in footer', () => {
    cy.visit('https://www.empik.com');
    cy.get('button[data-ta="cookie-btn-accept-all"]:visible').click({ force: true });
    cy.get('ul.empikFooter__social a[title="Instagram"]')
      .should('have.attr', 'href', 'https://instagram.com/empikcom')
      .and('have.attr', 'target', '_blank');
  });

  it('Should have correct Pinterest link in footer', () => {
    cy.visit('https://www.empik.com');
    cy.get('button[data-ta="cookie-btn-accept-all"]:visible').click({ force: true });
    cy.get('ul.empikFooter__social a[title="Pinterest"]')
      .should('have.attr', 'href', 'https://www.pinterest.com/empik/')
      .and('have.attr', 'target', '_blank');
  });
});
