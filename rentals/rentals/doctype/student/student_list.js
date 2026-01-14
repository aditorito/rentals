frappe.listview_settings['Student'] = {

    onload(listview) {
        console.log("Student list loaded");
    },

    get_indicator(doc) {
        if (doc.percentage < 40) {
            return [__("Fail"), "red", "percentage,<,40"];
        }
        return [__("Pass"), "green", "percentage,>=,40"];
    }
};
