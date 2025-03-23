document.addEventListener('DOMContentLoaded', function() {
    // 初始化EmailJS (注意：这里使用一个虚拟ID，实际使用需要替换为你的真实ID)
    emailjs.init("your_emailjs_user_id");

    const form = document.getElementById('emailForm');
    const successModal = document.getElementById('successModal');
    const errorModal = document.getElementById('errorModal');
    const closeModalBtn = document.getElementById('closeModal');
    const closeErrorModalBtn = document.getElementById('closeErrorModal');
    const errorMessageEl = document.getElementById('errorMessage');
    const submitBtn = document.getElementById('submitBtn');

    // 获取错误提示元素
    const nameError = document.getElementById('nameError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');

    // 表单输入元素
    const nameInput = document.getElementById('name');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    // 添加实时验证
    nameInput.addEventListener('input', function() {
        if (this.value.trim()) {
            nameError.classList.add('hidden');
        }
    });

    subjectInput.addEventListener('input', function() {
        if (this.value.trim()) {
            subjectError.classList.add('hidden');
        }
    });

    messageInput.addEventListener('input', function() {
        if (this.value.trim()) {
            messageError.classList.add('hidden');
        }
    });

    // 生成随机邮件地址
    function generateRandomEmail() {
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const length = Math.floor(Math.random() * 10) + 5; // 随机长度在5-15之间

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        const domains = ['gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com', 'mail.com'];
        const randomDomain = domains[Math.floor(Math.random() * domains.length)];

        return result + '@' + randomDomain;
    }

    // 表单提交处理函数
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // 验证表单
        let isValid = true;

        const nameValue = nameInput.value.trim();
        const subjectValue = subjectInput.value.trim();
        const messageValue = messageInput.value.trim();

        // 重置错误提示
        nameError.classList.add('hidden');
        subjectError.classList.add('hidden');
        messageError.classList.add('hidden');

        if (!nameValue) {
            nameError.classList.remove('hidden');
            nameInput.focus();
            isValid = false;
        }

        if (!subjectValue) {
            subjectError.classList.remove('hidden');
            if (isValid) subjectInput.focus();
            isValid = false;
        }

        if (!messageValue) {
            messageError.classList.remove('hidden');
            if (isValid) messageInput.focus();
            isValid = false;
        }

        if (!isValid) {
            return; // 如果表单无效，则停止执行
        }

        // 禁用提交按钮并显示加载状态
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>发送中...</span><div class="spinner"></div>';

        // 创建随机邮件地址
        const randomEmail = generateRandomEmail();

        // 模拟API调用 (实际使用时需要替换为EmailJS的实际调用)
        setTimeout(() => {
            try {
                // 在实际场景中，你应该使用类似以下的代码：
                /*
                emailjs.send('your_service_id', 'your_template_id', {
                    to_email: '1771376501@qq.com',
                    from_name: nameValue,
                    from_email: randomEmail,
                    subject: subjectValue,
                    message: messageValue
                })
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showSuccessModal();
                })
                .catch(function(error) {
                    console.log('FAILED...', error);
                    showErrorModal(error.text);
                })
                .finally(function() {
                    resetSubmitButton();
                });
                */
                
                // 这里使用随机成功/失败模拟实际场景
                const isSuccess = Math.random() > 0.2; // 80%概率成功
                
                if (isSuccess) {
                    console.log('模拟发送成功');
                    console.log('发送邮件到: 1771376501@qq.com');
                    console.log('发件人: ' + nameValue);
                    console.log('随机邮箱: ' + randomEmail);
                    console.log('主题: ' + subjectValue);
                    console.log('内容: ' + messageValue);
                    showSuccessModal();
                } else {
                    throw new Error('模拟的网络错误');
                }
            } catch (error) {
                console.error('发送失败:', error);
                showErrorModal(error.message);
            } finally {
                resetSubmitButton();
            }
        }, 1500); // 模拟网络延迟
    });

    // 重置提交按钮状态
    function resetSubmitButton() {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>发送邮件</span><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><use href="paper-plane.svg#paper-plane"></use></svg>';
    }

    // 显示成功模态框
    function showSuccessModal() {
        successModal.classList.add('show');
        form.reset();
    }

    // 显示错误模态框
    function showErrorModal(message) {
        errorMessageEl.textContent = message || "邮件发送过程中出现错误，请稍后再试。";
        errorModal.classList.add('show');
    }

    // 关闭模态框
    closeModalBtn.addEventListener('click', function() {
        successModal.classList.remove('show');
    });

    closeErrorModalBtn.addEventListener('click', function() {
        errorModal.classList.remove('show');
    });

    // 点击外部关闭模态框
    window.addEventListener('click', function(e) {
        if (e.target === successModal) {
            successModal.classList.remove('show');
        }
        if (e.target === errorModal) {
            errorModal.classList.remove('show');
        }
    });

    // 键盘Escape键关闭模态框
    window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            successModal.classList.remove('show');
            errorModal.classList.remove('show');
        }
    });
});
