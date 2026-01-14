frappe.pages['intro-page'].on_page_load = function(wrapper) {

    let page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Intro Page',
        single_column: true
    });

    $(wrapper).find('.page-content').html(`
        <div style="padding:20px">
            <h2>Aditya</h2>
            <p>I am learning how to build real systems with Frappe.</p>

            <button class="btn btn-primary" id="btn">
                Test Page
            </button>

            <div id="out" style="margin-top:10px"></div>
        </div>
    `);

    $('#btn').on('click', () => {
        $('#out').text('This page is running inside Desk.');
    });
};
