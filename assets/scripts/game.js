// LOOKING AT THE SOURCE CODE IS CHEATING YOU CHEATER
// codecracker | game.js

// define constants
const POP_THRESHOLD = 21;

// define variables
var winner = false;

// define counters
var guess_count = 0;
var pop_count = 0;

// define correct code
var generated_code = "";
var generated_code_array = [];

function generate_code() {
    for (var i = 1; i <= 6; i++) {
        var digit = Math.floor(Math.random() * 9) + 1
        generated_code_array .push(digit);

        generated_code = generated_code + digit.toString();
    }

    return Number(generated_code);
}

var correct_code = generate_code();

// define empty code
var code = [];

// get the value of the button clicked and call the add_value function
$(".puzzle_button").click(function() {
    var button_value = $(this).val();
    add_value(button_value);
});

// add value when a button is clicked
function add_value(value) {
    if (code.length < 6) {
        code.push(value);

        var index = code.length;
        show_code(index);
    } else {
        $('.code_digit > p').effect("shake", {distance: 2});
    }
}

// show value in dom code element
function show_code(index) {
    var add_value = `<p>${code[index - 1]}</p>`
    var current_element_id = `#code_${index}`;

    $(current_element_id).html(add_value);
}

// clear the code
function reset_code() {
    code = [];

    $(".code_digit").html('');
}

// test code
function test_code() {
    if (code.length == 6) {
        var cleaned_code = code.toString().replace(/,/g,'');

        if (cleaned_code == correct_code) {
            winner = true;
            code = [" ", "W", "I", "N", `<span class="code_span material-symbols-outlined">refresh</span>`, " "]
            
            for (var i = 1; i <= 6; i++) {
                var add_value = `<p class="pointer_cursor" onclick="reload_game()">${code[i - 1]}</p>`
                var current_element_id = `#code_${i}`;
            
                $(current_element_id).html(add_value);
            }
        } else {
            $('.code_digit > p').effect("shake", {distance: 2});
            $('.code_digit').fadeOut(500);

            setTimeout(() => {
                reset_code();
                $('.code_digit').fadeIn(0);
            }, 500);
        }

        check_matches(cleaned_code);
    } else {
        $('.code_digit > p').effect("shake", {distance: 2});
    }
}

// check matches
function check_matches(code) {
    guess_count = guess_count + 1;
    check_guess_count(guess_count);

    for (var i = 1; i <= 6; i++) {
        var dot = `#dot_${guess_count}_${i}`;

        if (code[i - 1] == generated_code_array[i - 1]) {
            color_dot(dot, code[i - 1], true);
        } else {
            color_dot(dot, code[i - 1], false)
        }
    }
}

// check guess count
function check_guess_count(count) {
    if (count >= 6 && winner == false) {
        code = [" ", "L", "O", "S", "E", " "]
            
        for (var i = 1; i <= 6; i++) {
            var add_value = `<p>${code[i - 1]}</p>`
            var current_element_id = `#code_${i}`;
        
            $(current_element_id).html(add_value);
        }

        setTimeout(() => { reload_game(); }, 500);
    }
}

// color dot
function color_dot(dot, number, correct) {
    const DOT_COLORS = {
        "right": "rgba(255, 115, 215, 0.75);",
        "wrong": "rgba(0, 0, 0, 0.5);"
    }

    if (correct == true) {
        var add_number = `<p class="correct_dot_number">${number}</p>`

        $(dot).css("background-color", DOT_COLORS.right);
        $(dot).html(add_number);
    } else {
        var add_number = `<p class="incorrect_dot_number">${number}</p>`
        
        $(dot).css("background-color", DOT_COLORS.wrong);
        $(dot).html(add_number);
    }
}

// bubble pop function
$("#bubbles").click(function() {
    pop_count = pop_count + 1;

    code = [" ", "P", "O", "P", "!", " "]
            
    for (var i = 1; i <= 6; i++) {
        var add_value = `<p>${code[i - 1]}</p>`
        var current_element_id = `#code_${i}`;
    
        $(current_element_id).html(add_value);
    }

    setTimeout(() => {
        reset_code();
        $('.code_digit').fadeIn(0);
    }, 100);

    if (pop_count == POP_THRESHOLD) {
        var correct_code_string = correct_code.toString();

        code = Array.from(correct_code_string)
            
        for (var i = 1; i <= 6; i++) {
            var add_value = `<p>${code[i - 1]}</p>`
            var current_element_id = `#code_${i}`;
        
            $(current_element_id).html(add_value);
        }

        pop_count = 0;
    }
});

// delete digit from array
function delete_digit() {
    var index = code.length;

    if (index != 0) {
        code.length = index - 1;
        remove_digit_code(index);
    }
}

// remove value in dom code element
function remove_digit_code(index) {
    var current_element_id = `#code_${index}`;

    $(current_element_id).html('');
}

// reload game
function reload_game() {
    location.reload();
}

// handle keyboard input
$(function() {
    $(document).keyup(function(e) {
        switch (e.which) {
            // enter | test code
            case 13:
                $("#test_code").trigger("click")
                break;
            // backspace | delete digit
            case 8:
                $("#delete_digit").trigger("click")
                break;
            // 1
            case 49:
                $("#pb_1").trigger("click")
                break;
            // 1
            case 49:
                $("#pb_1").trigger("click")
                break;
            // 2
            case 50:
                $("#pb_2").trigger("click")
                break;
            // 3
            case 51:
                $("#pb_3").trigger("click")
                break;
            // 4
            case 52:
                $("#pb_4").trigger("click")
                break;
            // 5
            case 53:
                $("#pb_5").trigger("click")
                break;
            // 6
            case 54:
                $("#pb_6").trigger("click")
                break;
            // 7
            case 55:
                $("#pb_7").trigger("click")
                break;
            // 8
            case 56:
                $("#pb_8").trigger("click")
                break;
            // 9
            case 57:
                $("#pb_9").trigger("click")
                break;
        }
    });
});

// IF YOU LOOKED YOU'RE A BAD PERSON