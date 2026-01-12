// Copyright (c) 2026, BWH and contributors
// For license information, please see license.txt

frappe.ui.form.on("Student", {
	refresh(frm) {
        

	},
    validate(frm){
        let arr = frm.doc.marksheet
        let total_marks = 0;
        for (let i = 0; i < arr.length; i++) {
            total_marks = total_marks +  arr[i].marks
            
            
        }
        

        let percentage = total_marks/arr.length;

        frm.set_value('percentage', percentage)
        

    }
});

