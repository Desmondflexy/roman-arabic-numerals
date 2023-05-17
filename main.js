main();

function main() {
  const [arabicInput, romanInput] = document.querySelectorAll('.input-div>input');
  arabicInput.value = romanInput.value = '';
  arabicInput.addEventListener('input', handleArabicInput);
  romanInput.addEventListener('input', handleRomanInput);
  romanInput.addEventListener('blur', handleArabicInput);

  function handleArabicInput() {
    if (arabicInput.validity.rangeUnderflow || arabicInput.validity.rangeOverflow) {
      arabicInput.setCustomValidity('Input must be between 1 and 3999');
      arabicInput.reportValidity();
      addErrorCSS(arabicInput, romanInput);
    } else {
      romanInput.value = toRoman(arabicInput.value);
      arabicInput.setCustomValidity("");
      arabicInput.onkeyup = () => arabicInput.classList.remove('invalid');
    }

    /**Converts number to roman numeral */
    function toRoman(num) {
      const arab_roman = {
        1000: 'M', 900: 'CM', 500: 'D', 400: 'CD', 100: 'C', 90: 'XC',
        50: 'L', 40: 'XL', 10: 'X', 9: 'IX', 5: 'V', 4: 'IV', 1: 'I'
      };
      const keys = Object.keys(arab_roman).sort((a, b) => b - a);

      let s = '';
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        const n = Math.trunc(num / k);
        if (n > 0) {
          s += arab_roman[k].repeat(n);
          num %= k;
        }
      }
      return s;
    }
  }

  function handleRomanInput() {
    romanInput.value = romanInput.value.toUpperCase();

    if (romanInput.validity.patternMismatch) {
      romanInput.setCustomValidity('Invalid roman numeral');
      romanInput.reportValidity();
      addErrorCSS(romanInput, arabicInput);
    } else {
      arabicInput.value = toArabic(romanInput.value);
      romanInput.setCustomValidity("");
      romanInput.onkeyup = () => romanInput.classList.remove('invalid');
    }

    if (romanInput.value === '') arabicInput.value = '';

    /**Converts roman numeral to number (arabic numeral) */
    function toArabic(s) {
      const roman_arab = {
        'M': 1000, 'CM': 900, 'D': 500, 'CD': 400, 'C': 100, 'XC': 90,
        'L': 50, 'XL': 40, 'X': 10, 'IX': 9, 'V': 5, 'IV': 4, 'I': 1
      };

      s = s.toUpperCase();
      let [num, i] = [0, 0];
      while (i < s.length) {
        const [a, b] = [s[i], s.slice(i, i + 2)];
        if (!Object.keys(roman_arab).includes(b)) {
          num += roman_arab[a];
          i += a.length;
        } else {
          num += roman_arab[b];
          i += b.length;
        }
      }
      return num;
    }
  }

  /**Stylize invalid user inputs on key press by adding and removing css classes*/
  function addErrorCSS(input1, input2) {
    input1.onkeyup = () => {
      input1.classList.add('invalid');
      input2.classList.add('invalid');
    }
    input1.onkeydown = () => {
      input1.classList.remove('invalid');
      input2.classList.remove('invalid');
    }
  }
}
