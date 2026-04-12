from playwright.sync_api import sync_playwright
import json

def test_mobile():
    errors = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={'width': 375, 'height': 812},
            device_scale_factor=3,
            is_mobile=True,
            has_touch=True
        )
        page = context.new_page()

        # Capture console errors
        page.on('console', lambda msg: errors.append(f"CONSOLE {msg.type.upper()}: {msg.text}") if msg.type == 'error' else None)
        page.on('pageerror', lambda err: errors.append(f"PAGE ERROR: {err}"))

        pages_to_test = [
            ('index', 'http://localhost:8080/index.html'),
            ('la-carrera', 'http://localhost:8080/la-carrera.html'),
            ('categorias', 'http://localhost:8080/categorias.html'),
            ('wods', 'http://localhost:8080/wods.html'),
            ('galeria', 'http://localhost:8080/galeria.html'),
            ('inscripcion', 'http://localhost:8080/inscripcion.html'),
        ]

        for name, url in pages_to_test:
            print(f"\n{'='*50}")
            print(f"Testing: {name} ({url})")
            print('='*50)

            page.goto(url, wait_until='networkidle')
            page.wait_for_timeout(1000)

            # Check hamburger menu
            menu_trigger = page.locator('#mobile-menu-trigger')
            nav_links = page.locator('.nav-links')

            print(f"Menu trigger visible: {menu_trigger.is_visible()}")
            print(f"Menu trigger exists: {menu_trigger.count() > 0}")

            # Check if nav has scrolled state
            navbar = page.locator('#navbar')
            print(f"Navbar visible: {navbar.is_visible()}")

            # Try clicking the hamburger
            if menu_trigger.count() > 0:
                print("Clicking hamburger...")
                menu_trigger.click()
                page.wait_for_timeout(500)

                # Check if menu is now visible
                nav_links_active = page.locator('.nav-links.active')
                print(f"Nav links active after click: {nav_links_active.count() > 0}")

                # Check body class
                body_class = page.evaluate('document.body.className')
                print(f"Body class: {body_class}")

                # Click again to close
                menu_trigger.click()
                page.wait_for_timeout(300)

            # Take screenshot
            page.screenshot(path=f'/tmp/{name}_mobile.png', full_page=False)
            print(f"Screenshot saved: /tmp/{name}_mobile.png")

            # Check for visible errors on page
            content = page.content()
            if 'error' in content.lower() and 'error-type' in content.lower():
                print("Possible error content detected")

        browser.close()

    # Print all errors
    print(f"\n{'='*50}")
    print("ERRORS CAPTURED:")
    print('='*50)
    for err in errors:
        print(err)

    if not errors:
        print("No console errors detected!")

if __name__ == '__main__':
    test_mobile()