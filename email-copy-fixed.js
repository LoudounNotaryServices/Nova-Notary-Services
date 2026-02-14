// Copy-to-clipboard functionality for email buttons (GitHub Pages compatible)
console.log('Email copy script loaded!');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - setting up email buttons');
    
    const emailBtn = document.getElementById('emailBtn');
    const emailBtn2 = document.getElementById('emailBtn2');
    const emailText = document.getElementById('emailText');
    const emailText2 = document.getElementById('emailText2');
    
    function copyEmailFallback(email) {
        // Create a temporary textarea element
        const textarea = document.createElement('textarea');
        textarea.value = email;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            // Use the older execCommand method (works on GitHub Pages)
            const successful = document.execCommand('copy');
            document.body.removeChild(textarea);
            return successful;
        } catch (err) {
            document.body.removeChild(textarea);
            return false;
        }
    }
    
    function copyEmail(e, textElement) {
        console.log('Button clicked!');
        console.log('Window width:', window.innerWidth);
        
        // Only activate on desktop
        if (window.innerWidth > 768) {
            console.log('Desktop detected - copying email');
            e.preventDefault();
            
            const email = 'notary847@gmail.com';
            const originalText = textElement.innerHTML;
            
            // Try modern clipboard API first, then fallback
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(email).then(function() {
                    console.log('Copy successful (clipboard API)!');
                    textElement.innerHTML = '✓ Email Copied!';
                    setTimeout(function() {
                        textElement.innerHTML = originalText;
                    }, 2000);
                }).catch(function(err) {
                    console.log('Clipboard API failed, trying fallback');
                    // Try fallback method
                    if (copyEmailFallback(email)) {
                        console.log('Copy successful (fallback method)!');
                        textElement.innerHTML = '✓ Email Copied!';
                        setTimeout(function() {
                            textElement.innerHTML = originalText;
                        }, 2000);
                    } else {
                        console.error('Both methods failed');
                        alert('Email: ' + email + '\n\nPlease copy manually.');
                    }
                });
            } else {
                // Clipboard API not available, use fallback directly
                console.log('Using fallback method directly');
                if (copyEmailFallback(email)) {
                    console.log('Copy successful (fallback method)!');
                    textElement.innerHTML = '✓ Email Copied!';
                    setTimeout(function() {
                        textElement.innerHTML = originalText;
                    }, 2000);
                } else {
                    console.error('Fallback method failed');
                    alert('Email: ' + email + '\n\nPlease copy manually.');
                }
            }
        } else {
            console.log('Mobile detected - using mailto');
        }
    }
    
    if (emailBtn) {
        emailBtn.addEventListener('click', function(e) {
            copyEmail(e, emailText);
        });
        console.log('Event listener added to button 1');
    }
    
    if (emailBtn2) {
        emailBtn2.addEventListener('click', function(e) {
            copyEmail(e, emailText2);
        });
        console.log('Event listener added to button 2');
    }
});
