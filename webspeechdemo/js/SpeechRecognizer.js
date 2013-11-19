var waitSource = waitSource || {};
var langs =
    [['Afrikaans',       ['af-ZA']],
        ['Bahasa Indonesia',['id-ID']],
        ['Bahasa Melayu',   ['ms-MY']],
        ['Català',          ['ca-ES']],
        ['Čeština',         ['cs-CZ']],
        ['Deutsch',         ['de-DE']],
        ['English',         ['en-AU', 'Australia'],
            ['en-CA', 'Canada'],
            ['en-IN', 'India'],
            ['en-NZ', 'New Zealand'],
            ['en-ZA', 'South Africa'],
            ['en-GB', 'United Kingdom'],
            ['en-US', 'United States']],
        ['Español',         ['es-AR', 'Argentina'],
            ['es-BO', 'Bolivia'],
            ['es-CL', 'Chile'],
            ['es-CO', 'Colombia'],
            ['es-CR', 'Costa Rica'],
            ['es-EC', 'Ecuador'],
            ['es-SV', 'El Salvador'],
            ['es-ES', 'España'],
            ['es-US', 'Estados Unidos'],
            ['es-GT', 'Guatemala'],
            ['es-HN', 'Honduras'],
            ['es-MX', 'México'],
            ['es-NI', 'Nicaragua'],
            ['es-PA', 'Panamá'],
            ['es-PY', 'Paraguay'],
            ['es-PE', 'Perú'],
            ['es-PR', 'Puerto Rico'],
            ['es-DO', 'República Dominicana'],
            ['es-UY', 'Uruguay'],
            ['es-VE', 'Venezuela']],
        ['Euskara',         ['eu-ES']],
        ['Français',        ['fr-FR']],
        ['Galego',          ['gl-ES']],
        ['Hrvatski',        ['hr_HR']],
        ['IsiZulu',         ['zu-ZA']],
        ['Íslenska',        ['is-IS']],
        ['Italiano',        ['it-IT', 'Italia'],
            ['it-CH', 'Svizzera']],
        ['Magyar',          ['hu-HU']],
        ['Nederlands',      ['nl-NL']],
        ['Norsk bokmål',    ['nb-NO']],
        ['Polski',          ['pl-PL']],
        ['Português',       ['pt-BR', 'Brasil'],
            ['pt-PT', 'Portugal']],
        ['Română',          ['ro-RO']],
        ['Slovenčina',      ['sk-SK']],
        ['Suomi',           ['fi-FI']],
        ['Svenska',         ['sv-SE']],
        ['Türkçe',          ['tr-TR']],
        ['български',       ['bg-BG']],
        ['Pусский',         ['ru-RU']],
        ['Српски',          ['sr-RS']],
        ['한국어',            ['ko-KR']],
        ['中文',             ['cmn-Hans-CN', '普通话 (中国大陆)'],
            ['cmn-Hans-HK', '普通话 (香港)'],
            ['cmn-Hant-TW', '中文 (台灣)'],
            ['yue-Hant-HK', '粵語 (香港)']],
        ['日本語',           ['ja-JP']],
        ['Lingua latīna',   ['la']]];

function SpeechRecognizer () {
    // SpeechRecognizer
    // The original code: http://updates.html5rocks.com/tag/voice
    var oPublic = {};
    var recognition; // The webkitSpeechRecognition holder.
    var status = {
        recognizing: false
    };
    var copyButton;
    var copyInfo;
    var emailButton;
    var startButton;
    var $userInputField;

    //
    // Private functions
    //
    function _init() {
        // Initialize the SpeechRecognizer
        for (var i = 0; i < langs.length; i++) {
            select_language.options[i] = new Option(langs[i][0], i);
        }
        select_language.selectedIndex = 6;
        updateCountry();
        select_dialect.selectedIndex = 6;
        showInfo('info_start');

        function updateCountry() {
            for (var i = select_dialect.options.length - 1; i >= 0; i--) {
                select_dialect.remove(i);
            }
            var list = langs[select_language.selectedIndex];
            for (var i = 1; i < list.length; i++) {
                select_dialect.options.add(new Option(list[i][1], list[i][0]));
            }
            select_dialect.style.visibility = list[1].length == 1 ? 'hidden' : 'visible';
        }

        var create_email = false;
        var final_transcript = '';
        // var recognizing = false;
        var ignore_onend;
        var start_timestamp;

        //
        // First check if the browser supports webkitSpeechRecognition. If not, show a message to recommend upgrading
        // the browser to a user. See detailed API in:
        // https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html
        if (!('webkitSpeechRecognition' in window)) {
            upgrade(); // Show message
        } else {
            start_button.style.display = 'inline-block';
            recognition = new webkitSpeechRecognition();
            recognition.continuous = true;
            // recognition.interimResults = true;
            recognition.interimResults = false;

            recognition.onstart = function() {
                status.recognizing = true;
                showInfo('info_speak_now');
                start_img.src = 'mic-animate.gif';
            };

            recognition.onerror = function(event) {
                if (event.error == 'no-speech') {
                    start_img.src = 'mic.gif';
                    showInfo('info_no_speech');
                    ignore_onend = true;
                }
                if (event.error == 'audio-capture') {
                    start_img.src = 'mic.gif';
                    showInfo('info_no_microphone');
                    ignore_onend = true;
                }
                if (event.error == 'not-allowed') {
                    if (event.timeStamp - start_timestamp < 100) {
                        showInfo('info_blocked');
                    } else {
                        showInfo('info_denied');
                    }
                    ignore_onend = true;
                }
            };

            recognition.onend = function() {
                // This is a callback function called at the end of the speech session. Change the mic icon appearance.
                status.recognizing = false;
                if (ignore_onend) {
                    return;
                }
                start_img.src = 'mic.gif';
                if (!final_transcript) {
                    showInfo('info_start');
                    return;
                }
                showInfo('');
                if (window.getSelection) {
                    window.getSelection().removeAllRanges();
                    var range = document.createRange();
                    range.selectNode(document.getElementById('final_span'));
                    window.getSelection().addRange(range);
                }
                if (create_email) {
                    create_email = false;
                    createEmail();
                }

                //
                // debug
                // clickStartButton();
            };

            recognition.onresult = function(event) {
                // This is the callback method that is invoked when the webkitSpeechRecognition catches some phrase.
                // In the event.results array, there are phrases that are captioned. Go through each of them and
                // and see the last word
                //
                // Todo. A captioning session stops abruptly. Can we just keep on captioning?
                var interim_transcript = '';
                for (var i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        final_transcript += event.results[i][0].transcript;
                    } else {
                        interim_transcript += event.results[i][0].transcript;
                    }
                }
                final_transcript = capitalize(final_transcript);
                final_span.innerHTML = linebreak(final_transcript);
                interim_span.innerHTML = linebreak(interim_transcript);
                if (final_transcript || interim_transcript) {
                    showButtons('inline-block');
                }

                //
                // Show the last phrase that was captioned.
                // Hard code everything that Google thinks 'uh huh' or 'yeah'
                var yeahWords = ['yeah', 'yes', 'young', 'yo'];
                var uhhuhWords = ['uh', 'huh', 'haha', 'Uhaul', 'Ohio', 'Ojo'];

                var numPhrases = event.results.length;
                if (event.results[numPhrases - 1].isFinal) {
                    var lastTranscript = event.results[numPhrases - 1][0].transcript;
                    lastTranscript = lastTranscript.trim();

                    //
                    // Check if either the lastTranscript is in one of the target phrases (i.e., 'yeah' or 'uh huh').
                    var yeahFlag = false;
                    var uhhuhFlag = false;
                    //
                    // Check if the user said 'yeah' or 'uhhuh'
                    for (var i = 0; i < yeahWords.length; i++) {
                        if (lastTranscript.indexOf(yeahWords[i]) !== -1) {
                            // I need to push the code to call a function that does something useful here.
                            $userInputField.html('Yeah');
                            yeahFlag = true;
                            break;
                        }
                    }
                    if (!yeahFlag) {
                        for (var i = 0; i < uhhuhWords.length; i++) {
                            if (lastTranscript.indexOf(uhhuhWords[i]) !== -1) {
                                // I need to push the code to call a function that does something useful here.
                                $userInputField.html('Uh huh');
                                uhhuhFlag = true;
                                break;
                            }
                        }
                    }

                    if (yeahFlag) {
                        waitSource.imageSelection.yeahOk();
                    } else {
                        waitSource.imageSelection.uhHuh();
                    }
                }
                console.log("Hey");
            };

        }

        //
        // Adding trim functions to strings
        // http://stackoverflow.com/questions/498970/how-do-i-trim-a-string-in-javascript
        String.prototype.trim = function () { return this.replace(/^\s+|\s+$/g, '');};

        //
        // Attach event listeners
        copyButton = document.getElementById('copy_button');
        emailButton = document.getElementById('email_button');
        startButton = document.getElementById('start_button');
        $userInputField = $("#userInput");

        if (startButton) {
            startButton.onclick = clickStartButton;
        }
        if (copyButton) {
            copyButton.onclick = clickCopyButton;
        }
        if (emailButton) {
            emailButton.onclick = clickEmailButton;
        }
    }

    var first_char = /\S/;
    function capitalize(str) {
        // A helper function to capitalize the first character.
        return str.replace(first_char, function(m) { return m.toUpperCase(); });
    }

    function clickCopyButton(event) {
        // This is a callback function for clicking a copy button
        if (status.recognizing) {
            status.recognizing = false;
            recognition.stop();
        }

        if (copyButton) {
            copyButton.style.display = 'none';
        }
        if (copyInfo) {
            copyInfo.style.display = 'inline-block';
        }
        // showInfo('');
    }

    function clickEmailButton(e) {
        // This is a callback function for clicking a copy button
        if (status.recognizing) {
            create_email = true;
            status.recognizing = false;
            recognition.stop();
        } else {
            createEmail();
        }
        email_button.style.display = 'none';
        email_info.style.display = 'inline-block';
        showInfo('');
    }

    function clickStartButton() {
        // This is a callback function for clicking a mic button.
        if (status.recognizing) {
            recognition.stop();
            return;
        }
        final_transcript = '';
        recognition.lang = select_dialect.value;
        recognition.start();
        ignore_onend = false;
        final_span.innerHTML = '';
        interim_span.innerHTML = '';
        start_img.src = 'mic-slash.gif';
        showInfo('info_allow');
        showButtons('none');
        start_timestamp = event.timeStamp;
    }

    function createEmail() {
        var n = final_transcript.indexOf('\n');
        if (n < 0 || n >= 80) {
            n = 40 + final_transcript.substring(40).indexOf(' ');
        }
        var subject = encodeURI(final_transcript.substring(0, n));
        var body = encodeURI(final_transcript.substring(n + 1));
        window.location.href = 'mailto:?subject=' + subject + '&body=' + body;
    }

    var two_line = /\n\n/g;
    var one_line = /\n/g;
    function linebreak(s) {
        return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
    }

    function showInfo(str) {
        // Show a message
        if (str) {
            for (var child = info.firstChild; child; child = child.nextSibling) {
                if (child.style) {
                    child.style.display = child.id == str ? 'inline' : 'none';
                }
            }
            info.style.visibility = 'visible';
        } else {
            info.style.visibility = 'hidden';
        }
    }

    var current_style;
    function showButtons(style) {
        if (style == current_style) {
            return;
        }
        current_style = style;

        if (copyButton) {
            copyButton.style.display = style;
            copyInfo.style.display = 'none';
        }
        if (emailButton) {
            emailButton.style.display = style;
            // emailInfo.style.display = 'none';
        }
    }

    function upgrade() {
        // Recommend a user to install the latest Google Chrome
        start_button.style.visibility = 'hidden';
        showInfo('info_upgrade');
    }

    //
    // Initialize the object
    //
    _init();

    return oPublic;
}