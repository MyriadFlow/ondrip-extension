import $ from "jquery"
import localizationCodes from "../common/localization-codes"
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('selectLanguageAndContinue')?.addEventListener('click', function () {
        let language = $('#languageSelection').val();
        chrome.storage.sync.set({ languageSelected: language }, function () {
            console.log('Language is set to: ' + language);
        });
        window.location.href = 'wallet.html';
    }, false);
});

$(function () {

    //..
    console.table(localizationCodes);

    var languageSelection = document.getElementById("languageSelection") as HTMLSelectElement;

    //Add the Options to the languageSelection DropDownList
    for (var i = 0; i < localizationCodes.length; i++) {
        var option = document.createElement("OPTION") as HTMLOptionElement;
        //Set Language Name in Text part.
        option.innerHTML = localizationCodes[i].name;
        //Set Language Code in Value part.
        option.value = localizationCodes[i].code;
        //Add the Option element to DropDownList
        languageSelection?.options.add(option);
    }

});