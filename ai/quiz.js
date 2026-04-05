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
    // Formspree сам обрабатывает отправку, просто добавляем скрытые поля
    const form = e.target;
    
    // Добавляем данные квиза в скрытые поля
    const taskInput = document.getElementById('quiz-task');
    const budgetInput = document.getElementById('quiz-budget');
    
    if (taskInput) taskInput.value = quizData.task || 'не выбрано';
    if (budgetInput) budgetInput.value = quizData.budget || 'не выбрано';
    
    // Formspree отправит форму сам, не предотвращаем default
    console.log('Отправка в Formspree:', { task: quizData.task, budget: quizData.budget });
}

// Инициализация: показать только step 1
document.addEventListener('DOMContentLoaded', () => {
    const step2 = document.getElementById('quiz-step-2');
    const step3 = document.getElementById('quiz-step-3');
    if (step2) step2.style.display = 'none';
    if (step3) step3.style.display = 'none';
});
