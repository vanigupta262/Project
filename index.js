
const element = document.querySelector('form');
element.addEventListener('submit', event => {
    event.preventDefault();
    
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let password_hash = CryptoJS.MD5(password);
    let url = 'https://ocs-tech-recruit-sample.vercel.app'
    fetch(url + '/api/login?username=' + username + '&password=' + password_hash, {method: 'POST'})
        .then(response => response.json())
        .then(data => {
            const role = data.cur_role;
            document.getElementById("loginForm").style.display = "none";
            let table = document.getElementById("user_table");
            document.getElementById("fetch_again").style.display = "block";
            table.style.display = "block";

            // now if role is admin, all data is shown
            if (role == 'admin') {
                
                data.all_users.forEach((user) => {
                    let row = table.insertRow();
                    let userid = row.insertCell();
                    let password_hash = row.insertCell();
                    let role = row.insertCell();
                    
                    userid.innerHTML = user.userid;
                    role.innerHTML = user.role;
                    password_hash.innerHTML = user.password_hash;

                })
            }
            else if (role == 'basic') {
                
                let row = table.insertRow();
                let userid = row.insertCell();
                let password_hash = row.insertCell();
                let role = row.insertCell();
                
                userid.innerHTML = data.user.userid;
                role.innerHTML = data.user.role;
                password_hash.innerHTML = data.user.password_hash;

            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});
