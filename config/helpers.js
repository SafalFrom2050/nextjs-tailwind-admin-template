export function ucfirst(str) {
    const firstLetter = str.substr(0, 1);
    return firstLetter.toUpperCase() + str.substr(1);
}

export function formatCurrency($amount) {
    return Intl.NumberFormat('en-IN').format(Number.parseInt($amount || '0'));
}

export function smoothScrollTop() {
    window.scrollTo({top: 0, behavior: "smooth"})
}

export function isMobileDisplay(){
    const x = window.matchMedia("(max-width: 700px)")
    return x.matches
}

export function replaceLast(str="", searchStr='', replacement="") {
// 👇️ 9
    const lastIndex = str.lastIndexOf(searchStr);

    let replaced = str;
    if (lastIndex !== -1) {
        replaced =
            str.substring(0, lastIndex) +
            replacement +
            str.substring(lastIndex + 1);
    }

    return replaced;
}