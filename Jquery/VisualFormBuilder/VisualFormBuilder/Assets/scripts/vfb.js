var _webAPIURL = 'Ajax/AjaxAction.aspx?Action=';
var alertDanger = '#danger-alert';
var alertSuccess = '#success-alert';
var FormEditorLink = 'FormEditor.aspx';
var FormDetailLink = 'Form.aspx';
var FormListLink = 'FormListing.html';
var FormPreviewLink = 'FormPreview.aspx';

var FormTable;

function createJSON() {
    var fieldId = '';
    var label = '';
    var controlName = '';
    var controlType = '';
    var jsonString = '';
    var IsAllowNull = '';
    var allowedMaxLength = '';


    $(".form-group.drop-item.form-tool").each(function () {
        if (jsonString == '')
            jsonString = '{"ConrtolsCollection": {"Control": [';
        else
            jsonString += ',';

        jsonString += '{"FieldId": "';
        fieldId = $(this).find(":hidden[name*=FieldId]").val();
        jsonString += fieldId;

        jsonString += '","Label": "';
        label = $(this).find(".control-label").text();
        jsonString += label;

        controlType = $(this).attr("data-control-type");
        jsonString += '","ControlName":"';
        if (controlType == 'radiolist')
            controlName = $(this).find(".form-radio-input.radio-input").attr("name");
        else if (controlType == 'checkboxlist')
            controlName = $(this).find(".form-check-input.chk-input").attr("name");
        else {

            controlName = $(this).find(".form-control.fb-control").attr("name");


            var attr = $(this).find(".form-control.fb-control").attr("maxLength");

            // For some browsers, `attr` is undefined; for others,
            // `attr` is false.  Check for both.
            if (typeof attr !== typeof undefined && attr !== false)
                allowedMaxLength = attr;
        }

        jsonString += controlName;
        jsonString += '","ControlType":"';
        jsonString += controlType;
        if ($(this).find(".isrequired.hide").length > 0)
            IsAllowNull = "1";
        else
            IsAllowNull = "0";
        jsonString += '","IsAllowNull":"';
        jsonString += IsAllowNull;
        jsonString += '","AllowedMaxLength":"';
        jsonString += allowedMaxLength;


        jsonString += '"}';
    });
    jsonString += ']}}';
    var dataToPost = {
        FormData: jsonString
    };
    //   dataToPost = 'FormData=' + jsonString;
    //  document.write(dataToPost);
    
    postJSON(dataToPost, _webAPIURL + 'SaveFormData&FormId=' + formId + '&FormTemplateId=' + formTemplateId, "Post", FormSubmitted, ErrorCallBack, false);
    //alert(jsonString);
    // document.write(jsonString);
}

function FormCreated(result) {
    if (result != null & result.data != null & result.data.Result != null & result.data.Result == "True") {
        alert("Form Saved in database");
        location.href = 'FormEditor.aspx?FormId=' + result.data.FormId;
    }
    else
        alert("Error Occured while saving Form in the database");
}

function saveFormDetails() {
    var jsonString = '';
    jsonString += '{"FormDetails": {"FormType":"';
    jsonString += formatForJSON($("#DropDownListFormType").val());
    jsonString += '","FormLocation":"';
    jsonString += formatForJSON($("#DropDownListFormLocation").val());
    jsonString += '","FormName":"';
    jsonString += formatForJSON($("#formName").val());
    jsonString += '","FormCategory":"';
    jsonString += formatForJSON($("#DropDownListFormCategory").val());
    jsonString += '","FormVersion":"';
    jsonString += formatForJSON($("#formVersion").val());
    jsonString += '","FormDescription":"';
    jsonString += formatForJSON($("#formDescription").val());
    jsonString += '","FormDependencyLevel":"';
    jsonString += formatForJSON($("#DropDownListDependencyLevel").val());
    jsonString += '","ParentFormName":"';
    jsonString += formatForJSON($("#DropDownListParentFormName").val());
    jsonString += '","DisplayStyle":"';
    jsonString += formatForJSON($("#DropDownListDisplayStyle").val());
    jsonString += '","isDraftMode":"';
   
    if ($("#checkBoxIsEnableDraft").is(":checked"))
        jsonString += '1';
    else
        jsonString += '0';
    jsonString += '","SignatureRouting":"';
    if ($("#checkBoxIsSignatureRouting").is(":checked"))
        jsonString += '1';
    else
        jsonString += '0';
    jsonString += '","FormID":"';
    jsonString += formatForJSON($("#formID").val());
    jsonString += '"}}';
    var dataToPost = {
        FormData: jsonString
    };

    postJSON(dataToPost, _webAPIURL + 'SaveForm', "Post", FormCreated, ErrorCallBack, false);
}

function formatForJSON(unformattedValue) {
    var formattedValue = '';
    formattedValue = unformattedValue;
    return formattedValue;
}
function postJSON(JSONString, ApiUrl, AjaxType, SuccessCallBack, ErrorCallBack, AsyncRequest) {
    $.ajax({
        type: AjaxType,
        data: JSONString,
        url: ApiUrl,
        controlType: "application/json",
        async: AsyncRequest,
        dataType: "json",
        success: SuccessCallBack,
        error: ErrorCallBack
    });
}
function getFormType() {
    //   postJSON("{}", ApiFunctionUrl + "/getFormType", "get","fillFormTypes","ErrorCallback",false);
    fillFormType(_jsonList);
}
function getFormLocations() {
    postJSON("{}", _webAPIURL + "/getFormLocation", "get", "fillFormLocations", "ErrorCallBack", false);
}
function getFormCategories() {
    postJSON("{}", _webAPIURL + "/getFormCategories", "get", "fillFormCategories", "ErrorCallBack", false);
}
function getFormDepedencyLevels() {
    postJSON("{}", _webAPIURL + "/getFormDepedencyLevels", "get", "fillFormDepedencyLevels", "ErrorCallBack", false);
}

function getTableColumnList(tableName) {
    postJSON("", _webAPIURL + "getTableColumnsList&TableName=" + tableName, "get", callback, ErrorCallBack, false);
}

function fillFormType(jsonObj) {
    fillDropDown(jsonObj, "formType", "stateid", "statename");
}

function fillFormLocation(jsonObj) {
    fillDropDown(jsonObj, "formType", "stateid", "statename");
}

function fillFormCategories(jsonObj) {
    fillDropDown(jsonObj, "formType", "stateid", "statename");
}

function fillFormDepedencyLevels(jsonObj) {
    fillDropDown(jsonObj, "formType", "stateid", "statename");
}

function fillColumnList(jsonResponse) {
    debugger;
    var listItems = '';
    var jsonObj = jsonResponse.data;
    if (jsonObj && jsonObj != '') {
        listItems = '<option value="">Please Select</option>';
        for (var i = 0; i < jsonObj.length; i++) {
            listItems += "<option value='" + jsonObj[i].ColumnName + "'>" + jsonObj[i].ColumnName + "</option>";
        }
    }
    $('#field-property-table select[data-field-property="itemsdatatextfield"]').html(listItems);
    $('#field-property-table select[data-field-property="itemsdatavaluefield"]').html(listItems);
}

function getColumnListHtml(jsonResponse) {
    var listItems = '';
    var jsonObj = jsonResponse.data;
    if (jsonObj && jsonObj != '') {
        listItems = '<option value="">Please Select</option>';
        for (var i = 0; i < jsonObj.length; i++) {
            listItems += "<option value='" + jsonObj[i].ColumnName + "'>" + jsonObj[i].ColumnName + "</option>";
        }
    }
    return listItems;
}

function fillDropDown(jsonData, dropDownObject, valueColumn, textColumn) {
    var listItems = "";
    for (var i = 0; i < jsonData.Table.length; i++) {
        listItems += "<option value='" + eval("jsonData.Table[i]." + valueColumn) + "'>" + eval("jsonData.Table[i]." + textColumn) + "</option>";
    }
    $("#" + dropDownObject).html(listItems);
}

function ErrorCallBack() {
    alert("Error Occured");
}

function getAllDropDowns(isFillForm) {
    var RequestUrl = _webAPIURL + 'LoadDropDowns';
    RequestUrl += '&stamp=' + $.now();

    var options = '';
    $.post(
        RequestUrl,
        function (Response) {
            //           setTimeout(function () {
            var data = Response.data;
            if (data.FormLocation && data.FormLocation.length > 0) {
                $.each(data.FormLocation, function (index, option) {
                    $('#DropDownListFormLocation').append('<option value="' + option.FormID + '">' + option.FormName + '</option>');
                });
            }

            if (data.FormType && data.FormType.length > 0) {
                $.each(data.FormType, function (index, option) {
                    $('#DropDownListFormType').append('<option value="' + option.FormTypeId + '">' + option.FormType + '</option>');
                });
            }

            if (data.FormCategory && data.FormCategory.length > 0) {
                $.each(data.FormCategory, function (index, option) {
                    $('#DropDownListFormCategory').append('<option value="' + option.FormCategoryID + '">' + option.FormCategoryName + '</option>');
                });
            }

            if (data.FormDepedencyLevel && data.FormDepedencyLevel.length > 0) {
                $.each(data.FormDepedencyLevel, function (index, option) {
                    $('#DropDownListDependencyLevel').append('<option value="' + option.DependencyLevelValue + '">' + option.DependencyLevel + '</option>');
                });
            }

            if (data.ParentFormName && data.ParentFormName.length > 0) {
                $.each(data.ParentFormName, function (index, option) {
                    $('#DropDownListParentFormName').append('<option value="' + option.FormID + '">' + option.FormName + '</option>');
                });
            }

            if (data.DisplayStyle && data.DisplayStyle.length > 0) {
                $.each(data.DisplayStyle, function (index, option) {
                    $('#DropDownListDisplayStyle').append('<option value="' + option.TabTypeId + '">' + option.TabType + '</option>');
                });
            }

            if (isFillForm)
                fillForm();

            //           }, 1000);
        });

}

function getFormListing() {
    FormTable = $('#FormsListing').DataTable({
        'processing': true,
        'serverSide': true,
        'ajax': {
            url: _webAPIURL +'FormDataListing&FormType=' + $("#DropDownListFormType").val() + '&FormLocation=' + $("#DropDownListFormLocation").val() + '&FormCategory=' + $("#DropDownListFormCategory").val() + '&FormDependencyLevel=' + $("#DropDownListDependencyLevel").val(),
            data: function (d) {
            }
        },
        'columns': [
            { 'data': 'FormID' },
            { 'data': 'FormName' },
            { 'data': 'FormType' },
            { 'data': 'Category' },
            { 'data': 'DependencyLevel' },
            {
                data: 'Action',
                className: 'action-btns text-right',
                render: function (data, type, form) {
                    var action_html = '';
                    action_html += '<a href="' + (FormDetailLink != '' ? FormDetailLink + '?FormId=' + form.FormID : 'javascript:void(0)') + '" title="EDIT FORM" class="edit-icon mr-10"><i class="glyphicon glyphicon-edit text-primary text-bold"></i></a>';
                    action_html += '<a href="' + (FormEditorLink != '' ? FormEditorLink + '?FormId=' + form.FormID : 'javascript:void(0)') + '" class="edit-icon mr-10" title="VIEW IN DESIGNER"><i class="glyphicon glyphicon-th"></i></a>';
                    action_html += '<a href="javascript:void(0)" onclick="viewFormVersions(' + form.FormID + ')" class="edit-icon mr-10" title="VIEW VERSIONS"><i class="glyphicon glyphicon-list"></i></a>';

                    if (form.VersionsCount > 0)
                        action_html += '<a href="' + (FormPreviewLink != '' ? FormPreviewLink + '?FormId=' + form.FormID : 'javascript:void(0)') + '" target="_blank" class="edit-icon mr-10" title="VIEW PREVIOUS FORM"><i class="glyphicon glyphicon-file"></i></a>';

                    action_html += '<a href="' + (_webAPIURL != '' ? _webAPIURL + "generateBRD" + '&FormId=' + form.FormID : "") + '" target="_blank" class="file-icon mr-10" title="GENERATE BRD"><i class="glyphicon glyphicon-download-alt"></i></a>';
                    action_html += '<a href="javascript:void(0)" data-formid="' + form.FormID + '" onclick="deleteForm(this)" title="DELETE" class="delete-btn"><i class="glyphicon glyphicon-trash"></i></a>';

                    return action_html;
                }
            }

        ],
        'fixedHeader': {
            header: false,
            footer: true
        },
        'order': [0, 'desc'],
        'paging': true,
        "pageLength": 25,
        'searching': false
    });
}

function refreshFormListing() {
    $('#FormsListing').DataTable()
        .ajax.url(_webAPIURL + 'FormDataListing&FormType=' + $("#DropDownListFormType").val() + '&FormLocation=' + $("#DropDownListFormLocation").val() + '&FormCategory=' + $("#DropDownListFormCategory").val() + '&FormDependencyLevel=' + $("#DropDownListDependencyLevel").val())
        .load();
}

function fillForm() {
    if (jsonResponse && jsonResponse != '') {
        var data = JSON.parse(jsonResponse);
        // alert($(data));
        var formDetail = '';

        if (data.Table && data.Table.length > 0) {
            formDetail = data.Table[0];
            //  jsonString += '{"FormDetails": {"FormType":"';
            $("#formID").val(formDetail.FormID);
            $("#DropDownListFormType").val(formDetail.FormType).change();
            $("#DropDownListParentFormName").val(formDetail.RootFormId).change();
            $("#DropDownListDisplayStyle").val(formDetail.TabTypeId)
            $("#DropDownListFormLocation").val(formDetail.FormLocation);
            $("#formName").val(formDetail.FormName);
            $("#DropDownListFormCategory").val(formDetail.FormCategory);
            $("#DropDownListDependencyLevel").val(formDetail.FormDependencyLevel);
            $("#formDescription").val(formDetail.FormDescription);
            $("#formVersion").val(formDetail.FormVersion);
            $("#formDescription").val(formDetail.FormDescription);
            if (formDetail.isDraftMode == true)
                $("#checkBoxIsEnableDraft").attr('checked', true);
            if (formDetail.SignatureRouting == true)
                $("#checkBoxIsSignatureRouting").attr('checked', true);
        }
    } else {
        if (formType && formType > 0)
            $("#DropDownListFormType").val(formType).change();

        if (rootFormId && rootFormId > 0)
            $("#DropDownListParentFormName").val(rootFormId).change();
    }
}



function viewFormVersions(formID) {
    if ($.fn.DataTable.isDataTable('#FormVersionListing')) {
        $('#FormVersionListing').DataTable().destroy();
    }

    $('#FormVersionListing').DataTable({
        'processing': true,
        'serverSide': true,
        'ajax': {
            url: _webAPIURL + 'FormVersionListing&FormID=' + formID,
            method: 'get',
            data: function (d) {

            }
        },
        'columns': [
            { 'data': 'Version' },
            { 'data': 'FieldAddedCount' },
            { 'data': 'FieldModifiedCount' },
            { 'data': 'FieldDeletedCount' },
            { 'data': 'BtnFieldAddedCount' },
            { 'data': 'BtnFieldModifiedCount' },
            { 'data': 'BtnFieldDeletedCount' },
            { 'data': 'CreatedOn' },

        ],
        'fixedHeader': {
            header: false,
            footer: true
        },
        'ordering': false,
        'paging': false,
        'searching': false
    });

    $("#formVersions").modal("show");
}

function restorePreviousVersion(formID) {
    var confirmation = confirm("Your latest changes will be override. Do you want to continue?");
    if (confirmation) {
        postJSON({}, _webAPIURL + "RestorePreviousVersion&FormID=" + formID, "get", restorePreviousVersionCallback, ErrorCallBack, false);
    }
}

function restorePreviousVersionCallback(result) {
    if (result != null & result.data != null & result.data.Result != null & result.data.Result == "True") {
        alert("Form restored to previous version");
        $("#formVersions").modal("hide");
    }
    else
        alert("Error Occured while restoring form version.");
}


function checkFormType(element) {
    var selectedText = $(element).find('option:selected').text();
    selectedText = selectedText.toLowerCase();

    if (selectedText == 'detail form') {
        $('.detail-form-type').removeClass('hide');
    } else {
        $('.detail-form-type').addClass('hide');
    }
}


function showMasterFormTypeField(element) {
    $(element).tooglClass('hide');
    $('.master-form-type').toggleClass('hide');
}

function getMasterFormetails(masterFormID) {
    if (masterFormID > 0) {
        $('.except-field').prop('disabled', true);
        postJSON({}, _webAPIURL + "FormDetails&FormID=" + masterFormID, "get", getMasterFormDetailsCallback, ErrorCallBack, false);
    } else {
        $('.except-field').prop('disabled', false);
        $('input[type="text"].except-field, textarea.except-field').val('');
        $("select.except-field option:selected").prop("selected", false);
        $("input[type='checkbox'].except-field").prop("checked", false);
    }
}

function getMasterFormDetailsCallback(response) {
    if (response.success) {
        if (response.data.Table && response.data.Table.length > 0) {
            var formDetail = response.data.Table[0];
            $("#DropDownListFormLocation").val(formDetail.FormLocation);
            $("#DropDownListFormCategory").val(formDetail.FormCategory);
            $("#DropDownListDependencyLevel").val(formDetail.FormDependencyLevel);
            $("#formVersion").val(formDetail.FormVersion);
            $("#formDescription").val(formDetail.FormDescription);
            if (formDetail.isDraftMode == true)
                $("#checkBoxIsEnableDraft").attr('checked', true);
            if (formDetail.SignatureRouting == true)
                $("#checkBoxIsSignatureRouting").attr('checked', true);
        }
    }
}

function getUrlVars(url) {
    var vars = {};

    if (url && url != '') {
        var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            vars[key] = value;
        });
    }

    return vars;
}

function getPageNameFromURL(url) {
    var pageName = '';

    if (url && url != '') {
        pageName = url.split("/").pop();
    }

    return pageName;
}