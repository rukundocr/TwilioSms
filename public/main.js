const phone = document.getElementById('mobile');
const message = document.getElementById('message');
const feedback = document.getElementById('feedback');
const submit = document.getElementById('btnSubmit');
submit.addEventListener('click', (e) => {
    e.preventDefault();
    const messageBody = {
        phone: phone.value,
        message: message.value
    }
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(messageBody),
    }
    fetch('/Send', options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const ui = `message is Sent to ${messageBody.phone} successfully`;
            feedback.textContent = ui;
        })
        .catch(error => {
            const ui = `message is not Sent . Some error Occurs `;
            feedback.textContent = ui;
            console.log(error)
        })
        ;

})