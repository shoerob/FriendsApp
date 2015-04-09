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
		ANDROID_PACKAGE: 'com.telerik.FriendsApp',

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
			loginButton: { id: 'login' }
            // tagName: {tagName: "button", index: 0},
			// id: {id: "submit", index: 0},
			// name: {name: "submitButton", index: 0},
			// className: {className: "submitButton", index: 0},
			// chained: [{tagName: "fieldset", index: 3}, {className: "submitButton", index: 0}]
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
                // inline query example
				web.getHtml({ className: 'km-view-title'}, function(result) {
					assert(result.trim()).equals('Activities');
				}),
			]
		},
        'Then the Not-Activities screen should be displayed' : {
			'default': [
                // inline query example
				web.getHtml({ className: 'km-view-title'}, function(result) {
					assert(result.trim()).equals('Not-Activities');
				}),
			]
		}
	};

	/**
	 * Tests
	 * These are the tests that will be performed against the application.
	 */
	describe("Verify activities user interface works as expected", function() {
		test("Activities screen should display on login", function() {
			step('Given Friends is running');
			step('And is logged in');
			step('Then the Activities screen should be displayed');
		});
        test("Not-Activities screen should display on login", function() {
			step('Given Friends is running');
			step('And is logged in');
			step('Then the Not-Activities screen should be displayed');
		});
	}, stepRepository);
});

