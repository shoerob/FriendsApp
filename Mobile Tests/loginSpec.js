spec(function() {
	/**
	 * Test Configuration
	 */
	var configuration = {
		// NOTE: Update this to an existing Telerik Backend Services username and password
		USERNAME: 'seth',
		PASSWORD: '333333',

		// NOTE: Update this to the iOS URL of the Friends App
		IOS_URL: 'friends://',

		// NOTE: Update this to the Android package name of the Friends App
		ANDROID_PACKAGE: 'com.telerik.Friends',

		// NOTE: Update this to the wp8 URI of thr Friends App
		WP8_URI: 'friends'
	};

	/**
	 * Queries
	 * These are reusable queries for elements in the user interface.
	 */
	var queries = {
		login: {
			usernameField: { id: 'loginUsername' },
			passwordField: { id: 'loginPassword' },
			loginButton: { id: 'login' },
			loginButtonText: [{ id: 'login' }, { className: 'km-text' }]
            // tagName: {tagName: "button", index: 1},
			// id: {id: "submit", index: 0},
			// name: {name: "submitButton", index: 0},
			// className: {className: "submitButton", index: 0},
			// chained: [{tagName: "fieldset", index: 3}, {className: "submitButton", index: 0}]
		},
		activities: {
			logoutButton: [{ id: 'view-all-activities'}, { className: 'km-leftitem' }, { className: 'nav-button' }]
		}
	};

	/**
	 * Step Repository
	 * These are reusable steps that perform actions in the application under test.
	 */
	var stepRepository = {
		'Given Friends is running': {
			'ios': [
				ios.launch(configuration.IOS_URL),
			],
			'android': [	
				android.launch(configuration.ANDROID_PACKAGE)
			],
			'wp8': [
				wp8.launch(configuration.WP8_URI)
			]
		},
		'And is logged in': {
			'default': [
				web.setValue(queries.login.usernameField, configuration.USERNAME),
				web.setValue(queries.login.passwordField, configuration.PASSWORD),
				web.tap(queries.login.loginButton)
			]
		},
		'Then the Activities screen should be displayed' : {
			'default': [
				web.wait(3000),
                // inline query example
				web.getHtml({ className: 'km-view-title'}, function(result) {
					assert(result.trim()).equals('Activities');
				}),
			]
		},
		'Then the login screen should be displayed': {
			'default': [
				web.getHtml(queries.login.loginButtonText, function(result) {
					assert(result.trim()).equals('Login');
				})
			]
		},
		'And logout is tapped': {
			'default': [
				web.tap(queries.activities.logoutButton),
				web.wait(2000)
			]
		}
	};

	/**
	 * Tests
	 * These are the tests that will be performed against the application.
	 */
	describe("Verify login functionality works as expected", function() {
		// Login test
		test("Activities screen should display on login", function() {
			step('Given Friends is running');
			step('And is logged in');
			step('Then the Activities screen should be displayed');
		});

		// Logout test
		test("Logout returns to login screen", function() {
			step("Given Friends is running");
			step('And is logged in');
			step('And logout is tapped');
			step('Then the login screen should be displayed');
		});		
	}, stepRepository);
});
