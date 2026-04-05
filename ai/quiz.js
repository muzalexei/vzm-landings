// Quiz Logic for AI Agency Landing (Viral Coach style)
let quizData = { task: '', budget: '' };

function nextQuizStep(value) {
    const step1 = document.getElementById('quiz-step-1');
    const step2 = document.getElementById('quiz-step-2');
    const step3 = document.getElementById('quiz-step-3');
    
    // Step 1 → Step 2 (выбор задачи)
    if (step1.style.display !== 'none' && !quizData.task) {
        quizData.task = value;
        document.getElementById('quiz-task').value = value;
        step1.style.display = 'none';
        step2.style.display = 'block';
        return;
    }
    
    // Step 2 → Step 3 (выбор бюджета)
    if (step2.style.display === 'block' && !quizData.budget) {
        quizData.budget = value;
        document.getElementById('quiz-budget').value = value;
        step2.style.display = 'none';
        step3.style.display = 'block';
        return;
    }
}

function backToStep1() {
    quizData.task = '';
    document.getElementById('quiz-step-2').style.display = 'none';
    document.getElementById('quiz-step-1').style.display = 'block';
}

function backToStep2() {
    quizData.budget = '';
    document.getElementById('quiz-step-3').style.display = 'none';
    document.getElementById('quiz-step-2').style.display = 'block';
}

function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    // Добавляем данные квиза
    formData.append('task', quizData.task);
    formData.append('budget', quizData.budget);
    
    console.log('Form submitted:', Object.fromEntries(formData));
    
    // TODO: Отправить в Google Forms / Telegram / API
    alert('✅ Заявка отправлена! Мы свяжемся с вами в течение часа.');
    
    // Редирект на thank-you page (создать позже)
    // window.location.href = 'thank-you.html';
}

// Инициализация: показать только step 1
document.addEventListener('DOMContentLoaded', () => {
    const step2 = document.getElementById('quiz-step-2');
    const step3 = document.getElementById('quiz-step-3');
    if (step2) step2.style.display = 'none';
    if (step3) step3.style.display = 'none';
});
