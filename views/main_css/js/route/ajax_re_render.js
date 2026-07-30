"use strict";

async function ajaxReRender(doc_name) {
    try {
        const response = await fetch(`/api/ajax_re_render/${doc_name}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (data.success) {
            return {
                success: true,
                html: data.html,
                js: data.js
            };
        } else {
            console.error('Failed to re-render document');
            return { success: false };
        }
    } catch (error) {
        console.error('Error during AJAX re-render:', error);
        return { success: false };
    }
}

async function autoReRender(doc_name, element_id = 'main_content') {
    const result = await ajaxReRender(doc_name);

    if (result.success) {
        const contentElement = document.getElementById(element_id);
        if (contentElement) {
            contentElement.innerHTML = result.html;

            if (result.js) {
                eval(result.js);
            }

            console.log('Document re-rendered successfully');
            return true;
        } else {
            console.error(`Element with id "${element_id}" not found`);
            return false;
        }
    }

    return false;
}
