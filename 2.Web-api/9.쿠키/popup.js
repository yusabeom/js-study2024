function createCookie(name) {
    const date = new Date();
    date.setDate(date.getDate()+1); // 쿠키의 수명을 하루로

    const cookie = `${name}=true;expires=${date.toUTCString}`; //중간에 세미콜론 필수

    //쿠키생성
    document.cookie = cookie;
}

function getCookie(name) {
    const cookies = document.cookie.split('; ');

    for(let c of cookies) {
        if(c.search(name) !== -1) {
            return true;
        }
    }
    return false;
}