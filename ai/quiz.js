// Quiz Logic for AI Agency Landing (Viral Coach style)
let quizData = { task: '', budget: '' };

function nextQuizStep(value) {
    const step1 = document.getElementById('quiz-step-1');
    const step2 = document.getElementById('quiz-step-2');
    const step3 = document.getElementById('quiz-step-3');
    
    // Step 1 → Step 2 (выбор задачи)
    if (step1 && step1.style.display !== 'none' && !quizData.task) {
        quizData.task = value;
        const taskInput = document.getElementById('quiz-task');
        if (taskInput) taskInput.value = value;
        step1.style.display = 'none';
        if (step2) step2.style.display = 'block';
        return;
    }
    
    // Step 2 → Step 3 (выбор бюджета)
    if (step2 && step2.style.display === 'block' && !quizData.budget) {
        quizData.budget = value;
        const budgetInput = document.getElementById('quiz-budget');
        if (budgetInput) budgetInput.value = value;
        step2.style.display = 'none';
        if (step3) step3.style.display = 'block';
        return;
    }
}

function backToStep1() {
    quizData.task = '';
    const step2 = document.getElementById('quiz-step-2');
    const step1 = document.getElementById('quiz-step-1');
    if (step2) step2.style.display = 'none';
    if (step1) step1.style.display = 'block';
}

function backToStep2() {
    quizData.budget = '';
    const step3 = document.getElementById('quiz-step-3');
    const step2 = document.getElementById('quiz-step-2');
    if (step3) step3.style.display = 'none';
    if (step2) step2.style.display = 'block';
}

function handleFormSubmit(e) {
    // Добавляем данные квиза в скрытые поля
    const taskInput = document.getElementById('quiz-task');
    const budgetInput = document.getElementById('quiz-budget');
    
    if (taskInput && !taskInput.value) taskInput.value = quizData.task || 'не выбрано';
    if (budgetInput && !budgetInput.value) budgetInput.value = quizData.budget || 'не выбрано';
    
    console.log('Отправка в Formspree:', { task: quizData.task, budget: quizData.budget });
    
    // Разрешаем Formspree отправить форму
    return true;
}

// Инициализация: показать только step 1
document.addEventListener('DOMContentLoaded', () => {
    const step2 = document.getElementById('quiz-step-2');
    const step3 = document.getElementById('quiz-step-3');
    if (step2) step2.style.display = 'none';
    if (step3) step3.style.display = 'none';
});
