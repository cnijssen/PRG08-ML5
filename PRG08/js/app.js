const classifier = ml5.imageClassifier('./model/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}

const imageUpload = document.getElementById("imageUpload");
imageUpload.addEventListener("change", handleImageUpload);

function handleImageUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
            classifyImage(img);
        };
        img.src = event.target.result;
    };
}

function classifyImage(img) { 
    classifier.classify(img, (error, results) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log(results);
        if (results[0].label === "capibara") {
            const msg = new SpeechSynthesisUtterance("Capibara detected!");
            const label = document.querySelector("#result");
            label.innerText = "Capibara detected!"; 
            
            window.speechSynthesis.speak(msg);
        } else {
            const msg = new SpeechSynthesisUtterance("That's not a capibara! Try again!");
            const label = document.querySelector("#result");
            label.innerText = "That's not a capibara! Try again!";
            window.speechSynthesis.speak(msg);
        }
    });
}