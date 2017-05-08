# cordova-plugin-fabric-digits

This plugin provides native mobile Digits.com integration for both Android and iOS.

## Installation

This requires cordova 5.0+ 

    cordova plugin add cordova-plugin-fabric-digits --variable FABRIC_API_KEY=your_api_key --variable FABRIC_CONSUMER_KEY=your_consumer_key --variable FABRIC_CONSUMER_SECRET=your_consumer_secret

It is also possible to install via repo url directly 

    cordova plugin add https://github.com/ahmedwahba/cordova-plugin-digits --variable FABRIC_API_KEY=your_api_key --variable FABRIC_CONSUMER_KEY=your_consumer_key --variable FABRIC_CONSUMER_SECRET=your_consumer_secret

### Important 

 - put your JSON file `android-digits-config.json` inside the project folder then modify it with your custom colors.
 
      This is example of the JSON object values, you can use only **android native default colors** as a value for  `windowBackground` option such as `white | black | darker_gray` , don't leave any of the options blank nor remove it.
      
        {
            "options": {
                    "textColor": "#ff0000",
                    "windowBackground": "white",
                    "buttonColor": "#DD2AA2",
                    "secondaryColor": "#DD2AA2"
            }
        }
 - After preparing android style file install the plugin with your fabric keys.
 - You may need to install if missing **xmldom** npm module using `npm install xmldom` or via [xmldom](https://www.npmjs.com/package/xmldom)

## Supported Platforms

 - iOS
 - Android

## Methods

 - window.plugins.digits.authenticate
 - window.plugins.digits.logout

### window.plugins.digits.authenticate

Initiates the Digits native interface. If successful the `authenticateSuccess` is called,
otherwise the `authenticateFailed` is called instead.

    window.plugins.digits.authenticate(options, authenticateSuccess, authenticateFailed);

#### Parameters

 - **options**: Theming options for iOS.
 - **authenticateSuccess**: The callback that is passed the authenticated info.
 - **geolocationError**: (Optional) The callback that executes if authentication fails.

#### Example

    // Currently only accentColor and backgroundColor is supported.
    // Note: These have no effect on Android.
    var options = {
      accentColor: '#ff0000',
      backgroundColor: '#ffffff',
    };

    window.plugins.digits.authenticate(options,
      function (oAuthHeaders) {
        // auth server token and phone number 
        // {serverToken:"",phoneNumber:""}
        console.log(oAuthHeaders);
      },
      function (error) {
        console.warn("[Digits]", "Login failed", error);
      }
    );

### window.plugins.digits.logout

It just clear the current active session.

    window.plugins.digits.logout();


## Contributors

This plugin is based off the work of another plugin: [https://github.com/JimmyMakesThings/cordova-plugin-digits](https://github.com/JimmyMakesThings/cordova-plugin-digits).
