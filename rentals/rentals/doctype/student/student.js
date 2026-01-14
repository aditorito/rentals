// Copyright (c) 2026, BWH and contributors
// For license information, please see license.txt

frappe.ui.form.on("Student", {
    refresh(frm) {

        if (!frm.bonus_area) {
            frm.bonus_area = $('<div style="margin:15px 0;"></div>')
                .appendTo(frm.fields_dict.marksheet.wrapper);
                console.log(wrapper);
                
        }

        if (!frm.bonus_control) {
            frm.bonus_control = frappe.ui.form.make_control({
                parent: frm.bonus_area,
                df: {
                    fieldtype: "Float",
                    label: "Bonus Marks",
                    fieldname: "bonus_marks",
                    default: 0,
                    onchange() {
                        calculate_percentage_with_bonus(frm);
                    }
                }
            });

            frm.bonus_control.refresh();
        }

        if (frm.doc.status != 'Active') {

            frm.fields_dict["marksheet"].grid.update_docfield_property(
                "marks",
                "read_only",
                1
            );

        }
        let percent = frm.doc.percentage || 0;

        frm.refresh_field("marksheet");
        frm.dashboard.add_progress(
            "Result",
            percent,
            percent
        )

    },
    validate(frm) {
        let arr = frm.doc.marksheet
        let total_marks = 0;
        for (let i = 0; i < arr.length; i++) {
            total_marks = total_marks + arr[i].marks


        }


        let percentage = arr.length ? total_marks / arr.length : 0;


        frm.set_value('percentage', percentage)




    },

    clear_empty_rows(frm) {
        console.log("this is runnig");

        frm.doc.marksheet = (frm.doc.marksheet || []).filter(row => row.subject);
    },


    Add_default_Subject(frm) {
        const default_sub = ['Maths', 'Science', 'English', 'Hindi'];

        for (let i = 0; i < default_sub.length; i++) {
            let row = frm.add_child(`marksheet`, {
                subject: default_sub[i],
                marks: 35
            });

            frm.refresh_field("marksheet");

        }

    },
    load_default_subjects(frm) {
        frm.trigger('clear_empty_rows');
        frm.trigger('Add_default_Subject')
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

            frappe.model.set_value(cdt, cdn, "marks", previous_marks);
        }
    }
});

