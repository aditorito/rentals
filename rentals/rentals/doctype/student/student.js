// Copyright (c) 2026, BWH and contributors
// For license information, please see license.txt

frappe.ui.form.on("Student", {
    refresh(frm) {

          if (frm.doc.status != 'Active') {

            frm.fields_dict["marksheet"].grid.update_docfield_property(
                "marks",
                "read_only",
                1
            );

        }
        frm.refresh_field("marksheet");


    },
    validate(frm) {
        let arr = frm.doc.marksheet
        let total_marks = 0;
        for (let i = 0; i < arr.length; i++) {
            total_marks = total_marks + arr[i].marks


        }


        let percentage = arr.length ? total_marks / arr.length : 0;


        frm.set_value('percentage', percentage)
    }
});


frappe.ui.form.on("Marksheet", {
    marksheet_add(frm, cdt, cdn) {
        let row = locals[cdt][cdn];
        row.marks = 35;
        frm.refresh_field("marksheet");
    },
    marks(frm, cdt, cdn) {
        let row = locals[cdt][cdn];       
        let previous_marks = row._previous_value || 0;
        

        if (row.marks > 100) {

            frappe.msgprint({
                title: "Invalid Marks",
                message: "Marks cannot be greater than 100",
                indicator: "red"
            });
            
            console.log(previous_marks);
            
            frappe.model.set_value(cdt, cdn, "marks", previous_marks);
        }
    }
});

