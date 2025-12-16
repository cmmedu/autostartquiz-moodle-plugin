/**
 * Auto-send finish attempt functionality
 * 
 * This script automatically submits the "Send all and finish" form when
 * the finish attempt page loads, if the auto-send feature is enabled.
 */
M.quizaccess_autostart = M.quizaccess_autostart || {};

M.quizaccess_autostart.autoSend = function() {
    function autoSendFinishAttempt() {
        // Buscar el formulario de finalización por ID
        var finishForm = document.getElementById("frm-finishattempt");
        
        if (finishForm) {
            // Buscar el botón de envío
            var submitButton = finishForm.querySelector("button[type=\"submit\"], input[type=\"submit\"]");
            
            if (submitButton && !submitButton.disabled) {
                // Enviar el formulario automáticamente
                finishForm.submit();
                return true;
            }
        }
        
        // También buscar por acción del formulario como respaldo
        var forms = document.querySelectorAll("form");
        for (var i = 0; i < forms.length; i++) {
            var form = forms[i];
            if (form.action && form.action.indexOf("processattempt.php") !== -1) {
                var finishInput = form.querySelector("input[name=\"finishattempt\"]");
                if (finishInput && finishInput.value === "1") {
                    var submitBtn = form.querySelector("button[type=\"submit\"], input[type=\"submit\"]");
                    if (submitBtn && !submitBtn.disabled) {
                        form.submit();
                        return true;
                    }
                }
            }
        }
        
        return false;
    }
    
    // Intentar enviar cuando el DOM esté listo
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", function() {
            setTimeout(autoSendFinishAttempt, 200);
        });
    } else {
        setTimeout(autoSendFinishAttempt, 200);
    }
    
    // También intentar después de delays adicionales por si hay contenido dinámico
    setTimeout(function() {
        autoSendFinishAttempt();
    }, 500);
    
    setTimeout(function() {
        autoSendFinishAttempt();
    }, 1000);
};

M.quizaccess_autostart.initAutoSend = function() {
    // Esperar a que el DOM esté completamente cargado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            M.quizaccess_autostart.autoSend();
        });
    } else {
        // Si ya está cargado, ejecutar inmediatamente
        setTimeout(function() {
            M.quizaccess_autostart.autoSend();
        }, 100);
    }
};
