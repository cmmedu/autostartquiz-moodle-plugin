<?php

defined('MOODLE_INTERNAL') || die();

class quizaccess_autostart extends quiz_access_rule_base {

    public static function make(quiz $quizobj, $timenow) {
        // Activar solo si el campo está habilitado.
        $quiz = $quizobj->get_quiz();
        if (empty($quiz->autostart_enabled)) {
            return null;
        }
        return new self($quizobj, $timenow);
    }

    public function description() {
        return ''; // No texto extra en la UI
    }

    public static function add_settings_form_fields($quizform, $mform) {

        // Agregar checkbox al formulario del quiz.
        $mform->addElement(
            'advcheckbox',
            'autostart_enabled',
            get_string('autostartcheckbox', 'quizaccess_autostart')
        );
    
        // Valor por defecto = 0
        $mform->setDefault('autostart_enabled', 0);
    
        // Para que se guarde correctamente como número
        $mform->setType('autostart_enabled', PARAM_INT);
    }

    
    public static function get_settings_sql() {
        return ['quiz.autostart_enabled AS autostart_enabled', []];
    }
    
}


