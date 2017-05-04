#!/usr/bin/env node


/*
 *  copy custome values for style from JSON file 
 */

var fs = require('fs');
var path = require('path');
var DOMParser = require('xmldom').DOMParser;
var XMLSerializer = require('xmldom').XMLSerializer;

var filestocopy = [{ "android-digits-config.json": "plugins/cordova-plugin-fabric-digits/src/android/style/styles.xml" }];

filestocopy.forEach(function(obj) {
    Object.keys(obj).forEach(function(key) {
        var val = obj[key];
        var configJSONFile =  key;
        var stylesXMLFile = val;
        console.log("- fetching digit style from  "+ configJSONFile  );
        
        if (fs.existsSync(configJSONFile) && fs.existsSync(stylesXMLFile)) {
            var configObject = JSON.parse(fs.readFileSync(configJSONFile, 'utf8'));
            var textColorPrimary = configObject.options["textColor"];
            var windowBackground = configObject.options["windowBackground"];
            var buttonColor = configObject.options["buttonColor"];
            var textColorSecondary = configObject.options["secondaryColor"];
            
            fs.readFile(stylesXMLFile, "utf-8", function (err,data) 
            {
                
                var XMLDom = new DOMParser().parseFromString(data);
                FindByAttributeValue(XMLDom,"name","android:textColorPrimary").childNodes[0].data = textColorPrimary;
                FindByAttributeValue(XMLDom,"name","android:windowBackground").childNodes[0].data = "@android:color/" + windowBackground;
                FindByAttributeValue(XMLDom,"name","dgts__accentColor").childNodes[0].data = buttonColor;
                FindByAttributeValue(XMLDom,"name","android:textColorLink").childNodes[0].data = buttonColor;
                FindByAttributeValue(XMLDom,"name","android:textColorSecondary").childNodes[0].data = textColorSecondary;
                
                var newXMLConfig = new XMLSerializer().serializeToString(XMLDom);
                console.log("- applying custom digits style ..   ");
                replaceStringInFile(stylesXMLFile,data,newXMLConfig);
                
            });
            
        }
      else
      {
         console.log("- ERROR while applying custom digits style   ");
      }
    });
});

function FindByAttributeValue(parentElement, attribute, value)    {
    var All = parentElement.getElementsByTagName('*');
    for (var i = 0; i < All.length; i++)       {
      if (All[i].getAttribute(attribute) === value) { return All[i]; }
    }
}

function replaceStringInFile(filename, toReplace, replaceWith) {
    var data = fs.readFileSync(filename, 'utf8');
    var result = data.replace(toReplace, replaceWith);
    fs.writeFileSync(filename, result, 'utf8');
}
