/**
*  Common JS
*/
var alertDanger = '#danger-alert';
var alertSuccess = '#success-alert';

$(document).ready(function () {
    $('#AddFormPopup').on('hidden.bs.modal', function () {
        var $modal = $(this);
        $modal.find('.modal-body').addClass('hide');
        $modal.find('.modal-footer').removeClass('hide');

        $modal.find('select').find('option:first').prop('selected', true);
    });
});

function disableSubmitButtons() {
    $('.action-button[data-action="save"]').attr('disabled', 'disabled');
}

function enableSubmitButtons() {
    $('.action-button[data-action="save"]').removeAttr('disabled', 'disabled');
}

function showLoader() {
    $('.loader').removeClass('hide');
}

function hideLoader() {
    $('.loader').addClass('hide');
}

function RedirectToFormPage() {
    window.location = FormDetailLink + "?FormType=2&RootFormId=" + formId;
}

function LinkToExistingForm(btnElement) {
    var $modal = $(btnElement).parents('.modal');
    $modal.find('.modal-body').removeClass('hide');
    $modal.find('.modal-footer').addClass('hide');
}

function CreateChildForm() {
    var error = false;
    var fieldName = '';

    var formData = {};

    $("#AddFormPopup [data-required='true']").each(function () {
        fieldName = $(this).attr('name');
        if (!ElementValidate(this)) {
            error = true;
            return false;
        }

        formData[fieldName] = $(this).val();
    });

    if (error) {
        ShowMessage($("#AddFormPopup .message-box"), fieldName + ' is required.', 'alert-danger');
        return false;
    }

    postJSON(formData, _webAPIURL + "CreateChildForm&FormID=" + formId, "POST", CreateChildFormCallback, ErrorCallBack, false);
}

function LoadChildFormDesigner(childFormID) {
    var childSelector = '#child_' + childFormID + ' .drag-drop-area';
    $(childSelector).html('<div class="loader"><span class="glyphicon glyphicon-repeat fast-right-spinner"></span></div>');
    
    postJSON("", _webAPIURL + "FormFields&ChildFormID=" + childFormID, "GET", LoadChildFormDesignerCallback, ErrorCallBack, false);
}

function LoadChildFormDesignerCallback(response) {
    if (response && response.success) {
        var childSelector = '#child_' + response.childFormId;
        var childFormContainer = childSelector + ' .drag-drop-area';

        $(childFormContainer).html('');
        forms.RenderFormFileds(response.data, childFormContainer);
        $('.nav li a[href="' + childSelector + '"]').removeAttr('onclick');
    } else {
        alert(response.message);
    }
}

function CreateChildFormCallback(response) {
    if (response && response.success) {
        ShowMessage($("#AddFormPopup .message-box"), 'Master form linked to the selected from successfully.', 'alert-success');

        var childId = response.ChildFormID;

        if (childId && childId > 0) {
            var childFormName = $("#AddFormPopup #ChildFormID").find("option[value='" + childId + "']").text();
            var childSelector = "#child_" + childId;
            var childTab = $(childSelector);

            if (childTab.length == 0) {
                $("#drag-area-container>.nav>li:last").before('<li><a data-toggle="tab" href="' + childSelector + '" onclick="LoadChildFormDesigner(' + childId + ')">' + childFormName + '</a></li>');
                $("#drag-area-container>.tab-content").append('<div id="' + childSelector +'" class="tab-pane fade"><div class="drag-drop-area"></div></div>');
            }
        }

        setTimeout(function() {
            $("#AddFormPopup").modal("hide");
        }, 3000);
    } else {
        ShowMessage($("#AddFormPopup .message-box"), response.message, 'alert-danger');
        return false;
    }
}

function ShowMessage(container, message, alertClass) {
    container.html(message).addClass(alertClass).removeClass('hide');

    setTimeout(function () {
        container.html('').removeClass(alertClass).addClass('hide');
    }, 3000);
}

function ElementValidate(element) {
    var elementValue = $(element).val();
    if ($(element).prop('tagName') == 'SELECT') {
        return elementValue && elementValue != '' && elementValue != '-1';
    } else {
        return elementValue && elementValue != '';
    }
}

/**
 *  Form Builder JS
 */

var forms = function () {
    var activeControl = '';
    var targetContainer = '';

    function performOnLoadActions() {
        /* FIXED PANELS CODE */
        $leftPanel = $("#form-tools-container");
        $rightPanel = $("#field-property-container");
        $rightPanelWithoutHeader = $rightPanel.find(".panel-body");

        $leftPanel.css({ width: $leftPanel.width(), top: $leftPanel.offset().top, left: $leftPanel.offset().left, position: 'fixed' });

        $rightPanel.css({ visibility: 'hidden' }).removeClass('hide');
        $rightPanel.css({ width: $rightPanel.width(), top: $rightPanel.offset().top, left: $rightPanel.offset().left, position: 'fixed' });
        $rightPanelWithoutHeader.css({ 'overflow': 'hidden', 'overflow-y': 'auto', 'max-height': $(window).height() - $rightPanelWithoutHeader.offset().top - $rightPanel.offset().top })
        $rightPanel.css({ visibility: '' }).addClass('hide');
    }

    function bindNavigateAway() {
        window.onbeforeunload = function () {
            if ($('#isFormAltered').val() == '1') {
                return 'Are you sure you want to leave this page? Your changes have not been saved.';
            } else {
                location.href = FormListLink;
            }
        };
    }

    function bindBasicActions() {
        $(document).on('click', '.action-button', function (e) {
            e.stopPropagation();
            var action = $(this).attr('data-action');
            if (action == 'save') {
                disableSubmitButtons();
                saveFormFields();
            } else if (action == 'commandargumentdialog') {
                showCommandArgumentDialog();
            } else if (action == 'generatecmdargumenturl') {
                GenerateCmdArgumentUrl();
            } else {
                location.href = FormListLink;
            }
        });
    }

    function bindFormBuilderBasicActions() {
        $(document).on('click', '.drop-item > .field-actions .del-button', function (e) {
            e.stopPropagation();
            var isConfirmed = confirm("Do you want to delete?");

            if (isConfirmed) {
                var control = $(this).closest('.drop-item');

                if (control.hasClass('active') || control.find('.drop-item.active').length > 0) {
                    loadProperties(false);
                }

                $(control).closest('.drop-item').slideUp('normal', function () {
                    $(control).remove();
                });

                toggleSaveButton(true);
            }
        }).on('mouseenter', '.drop-item > .field-actions .del-button', function (e) {
            e.stopPropagation();
            $(this).closest('.drop-item').addClass('delete');
        }).on('mouseleave', '.drop-item > .field-actions .del-button', function (e) {
            e.stopPropagation();
            var control = $(this).closest('.drop-item');
            control.removeClass('delete');
        });

        $(document).on('click', '.drop-item > .field-actions .edit-button', function (e) {
            e.stopPropagation();
            targetContainer = $(this).closest('.drop-item');
            toggleActivation();
        });

        $(document).on('click', '.drop-item > .field-actions .copy-button', function (e) {
            e.stopPropagation();
            var control = $(this).closest('.drop-item');
            var $el = control.clone().removeClass('.active').removeClass('.delete').insertAfter(control);
            var controlType = control.attr('data-control-type');
            applyDroppable($el, controlType);
            changeNamesOfDuplicateControls($el, controlType);
        });

        $(document).on('click', '#field-property-table .opt-add', function (e) {
            e.stopPropagation();

            var NewlyAddedOption = $('#field-property-table .options-list .opt-single:first').clone().appendTo('#field-property-table .options-list');
            NewlyAddedOption.find('.opt-value').val('');
        });

        $(document).on('click', '#field-property-table .opt-remove i', function (e) {
            e.stopPropagation();
            if ($('#field-property-table .options-list .opt-single').length > 1) {
                $(this).closest('.opt-single').remove();
                var activeDataFieldProperty = $(this).attr('data-field-property');

                applyRealtimeChanges('newudoptions', '');
            }
        });

        $(document).on('change', '#field-property-table .form-control', function () {
            var activeDataFieldProperty = $(this).attr('data-field-property');

            var valueToChange = $(this).val();

            if (activeDataFieldProperty && activeDataFieldProperty != '') {
                if ($(this).attr('data-field-required') == 'true' && (!valueToChange || valueToChange == '')) {
                    var fieldProperty = $('#field-property-table .form-control[data-field-property="' + activeDataFieldProperty + '"]').closest('tr');
                    var fieldTitle = fieldProperty.find('td.property-label').contents().get(0).nodeValue;
                    alert((fieldTitle ? fieldTitle.trim() : 'Field') + ' is required');
                    getPropertiesFor(fieldProperty);
                    return false;
                }

                var returnedValue = applyRealtimeChanges(activeDataFieldProperty, valueToChange);

                if (returnedValue != false)
                    toggleSaveButton(true);
            } else {
                toggleSaveButton(true);
            }

            showHideChildrenProperties($(this).parents('tr'), activeDataFieldProperty, false);
        });

        $(document).on('change', '#form-property-container .form-control', function () {
            var activeFormProperty = $(this).attr('data-form-property');
            if (activeFormProperty == 'templatename') {
                var valueToChange = $(this).val();
                $('#form-title').text(valueToChange);
            }

            toggleSaveButton(true);
        });
    }
    
    function bindDragAndDrop() {
        $('a.form-tool, .layout-tool, .btn-tool').draggable({
            helper: 'clone',
            appendTo: 'body',
            revert: 'invalid',
            scroll: false,
            start: function (event, ui) {
                $(this).draggable('option', 'cursorAt', {
                    left: Math.floor(this.clientWidth / 2),
                    top: Math.floor(this.clientHeight / 2)
                });

                $(ui.helper).css('width', this.clientWidth);
            }
        });

        $('#form-design-area').droppable({
            accept: '.form-tool, .layout-tool',
            helper: 'clone',
            drop: handleDrop,
            hoverClass: 'drag-hover'
        })
        .sortable({
            update: function (event, ui) {
                toggleSaveButton(true);

                var targetContainer = ui.item;
                var controlType = targetContainer.attr("data-control-type");

                if (controlType != 'section') {
                    targetContainer = targetContainer.find(".fb-control");
                }
                    
                addChangeAttribute(targetContainer);
            }
        })
        .disableSelection();


        $('#btns-design-area').droppable({
            accept: '.btn-tool',
            helper: 'clone',
            drop: handleDrop,
            hoverClass: 'drag-hover'
        }).sortable();
    }

    function handleDrop(event, ui) {
        var $orig = $(ui.draggable);
        if (!$orig.hasClass('drop-item')) {
            var template = '';
            var controlType = $(ui.draggable).attr('data-type');

            if (controlType == 'defaultfield') {
                var index = $(ui.draggable).attr('data-index');
                template = bindFormFieldTemplate(defaultFormFieldsResponse[index]);
            } else {
                template = getTemplateByType(controlType);
            }

            var $el = $(template).appendTo(this);
            applyDroppable($el, controlType);
            toggleSaveButton(true);
        } else {
            var classes_to_remove = ["ui-draggable", "ui-draggable-dragging", "ui-sortable-helper"];

            if ($(this)[0] != $orig.parent()[0]) {
                var $el = $orig
                    .clone()
                    .appendTo(this);
                $orig.remove();


                $.each(classes_to_remove, function (i, c) {
                    $el.removeClass(c);
                });
                $el.removeAttr("style");
            } else {
                $.each(classes_to_remove, function (i, c) {
                    $orig.removeClass(c);
                });
                $orig.removeAttr("style");
            }
        }
    }

    function applyDroppable(element, controlType) {
        if (controlType == 'section') {
            element.find('div[class*="col-"]').droppable({
                accept: '.form-tool',
                helper: 'clone',
                drop: handleDrop,
                greedy: true,
                hoverClass: 'drag-hover'
            })
                .sortable({
                    update: function (event, ui) {
                        toggleSaveButton(true);

                        var targetContainer = ui.item;
                        var controlType = targetContainer.attr("data-control-type");

                        if (controlType != 'section') {
                            targetContainer = targetContainer.find(".fb-control");
                        }

                        addChangeAttribute(targetContainer);
                    }
                })
                .disableSelection();
        } else if (controlType == 'button') {
            element.addClass("btn-tool");
        } else {
            element.addClass("form-tool");
        }
    }

    function toggleActivation() {
        if (targetContainer.hasClass('active')) {
            targetContainer.removeClass('active');
            activeControl = '';
            targetContainer = '';
            loadProperties(false);
        } else {
            $('.drop-item').removeClass('active');
            targetContainer.addClass('active');
            activeControl = targetContainer.attr('data-control-type');
            loadProperties(true);
        }
    }

    function loadProperties(check) {
        if (check) {
            $('#field-property-container').removeClass('hide');
            var controlName = activeControl && activeControl != '' ? activeControl.replace('list', '') : 'Control';

            $('#field-property-container .panel-title .active-control-type').text(controlName);

            if (activeControl == 'section' || activeControl == 'button') {
                $('#field-property-table tr').hide();

                if (activeControl == 'section')
                    $('#field-property-table tr.layout-field-property').show();
                else
                    $('#field-property-table tr.button-field-property').show();
            } else {
                $('#field-property-table tr').show();
                $('#field-property-table tr.layout-field-property, #field-property-table tr.button-field-property').hide();
            }

            /** Render visibility field property dropdown **/
            var $visibilityControl = $('#field-property-table tr.field-property').find('.form-control[data-field-property="visibilityfield"]');

            $visibilityControl.find('option').not(':first').remove();


            $("#form-design-area .fb-control").each(function (index, element) {
                if (!$(element).parents('.drop-item').hasClass('active'))
                    $visibilityControl.append('<option value="' + $(element).attr('data-name') + '">' + $(element).closest('.drop-item').find('.control-label').text().trim() + '</option>');
            });


            // Hide Field Specific Properties & Child Properties
            $('#field-property-table tr.field-specific-property').hide();
            $('#field-property-table tr[data-child-property]').hide();

            //
            $('#field-property-table tr.field-specific-property.' + activeControl).show();

            var activeProperties = $('#field-property-table').find('tr.field-property:visible');

            $.each(activeProperties, function () {
                getPropertiesFor($(this));
            });
        } else {
            $('#field-property-container').addClass('hide');
        }
    }

    function getPropertiesFor(control) {
        var controlType = '';
        var contolValue = '';
        var propertycontrol = '';

        propertycontrol = control.find('.form-control');
        controlType = propertycontrol.attr('data-field-property');

        switch (controlType) {
            case 'categoryname':
                var categoryName = targetContainer.find('legend').text();
                propertycontrol.val(categoryName.trim());
                break;

            case 'newcolumn':
            case 'allowtab':
                var fieldAttribute = 'data-' + controlType;
                var attributeValue = targetContainer.attr(fieldAttribute);

                if (typeof attributeValue !== typeof undefined && attributeValue == 'true') {
                    propertycontrol.filter('[value="true"]').prop('checked', true);
                    propertycontrol.filter('[value="true"]').attr('checked', 'checked');
                } else {
                    propertycontrol.filter('[value="false"]').prop('checked', true);
                    propertycontrol.filter('[value="false"]').attr('checked', 'checked');
                }
                break;

            case 'tabname':
                var fieldAttribute = 'data-' + controlType;
                var attributeValue = targetContainer.attr(fieldAttribute);

                if (typeof attributeValue !== typeof undefined && attributeValue != "") {
                    propertycontrol.val(formatString(attributeValue));
                } else {
                    resetFormFieldValue(propertycontrol);
                }
                break;

            case 'actionscopeid':
            case 'isflat':
            case 'actiongroup':
            case 'headertext':
            case 'commandname':
            case 'commandargument':
                var fieldAttribute = 'data-' + controlType;
                var buttonControl = targetContainer.find('button');

                var attributeValue = buttonControl.attr(fieldAttribute);

                if (controlType == 'isflat') {
                    if (typeof attributeValue !== typeof undefined && attributeValue == 'true') {
                        propertycontrol.filter('[value="true"]').prop('checked', true);
                        propertycontrol.filter('[value="true"]').attr('checked', 'checked');
                    } else {
                        propertycontrol.filter('[value="false"]').prop('checked', true);
                        propertycontrol.filter('[value="false"]').attr('checked', 'checked');
                    }
                } else {
                    if (typeof attributeValue !== typeof undefined && attributeValue != "") {
                        propertycontrol.val(formatString(attributeValue));
                    } else {
                        resetFormFieldValue(propertycontrol);
                    }
                }
                break;

            case 'label':
                var tagName = targetContainer.prop('tagName').toLowerCase();
                var labelValue = '';
                if (tagName == controlType) {
                    labelValue = targetContainer.contents().get(1).nodeValue;
                } else {
                    labelValue = targetContainer.find('.control-label').text();
                }
                labelValue = targetContainer.find('.control-label').text();
                propertycontrol.val(labelValue.trim());
                break;

            case 'name':
                if (activeControl == 'radiolist') {
                    var name = targetContainer.find('.radio-single:first .fb-control').attr('data-name');
                } else if (activeControl == 'checkboxlist') {
                    var name = targetContainer.find('.chk-single:first .fb-control').attr('data-name');
                } else {
                    var name = targetContainer.find('.fb-control').attr('data-name');
                }

                if (typeof name !== typeof undefined && name !== false) {
                    propertycontrol.val(name);
                } else {
                    propertycontrol.val('');
                }
                break;

            case 'required':
            case 'readonly':
            case 'ismultiselect':
                propertycontrol.removeAttr("checked");
                propertycontrol.prop('checked', false);

                var attributeValue = targetContainer.find('.fb-control').attr('data-' + controlType);

                if (typeof attributeValue !== typeof undefined && attributeValue == 'true') {
                    propertycontrol.filter('[value="true"]').prop('checked', true);
                    propertycontrol.filter('[value="true"]').attr('checked', 'checked');
                } else {
                    propertycontrol.filter('[value="false"]').prop('checked', true);
                    propertycontrol.filter('[value="false"]').attr('checked', 'checked');
                }
                break;

            case 'maxlength':
                var maxlength = targetContainer.find('.fb-control').attr('data-maxlength');

                if (typeof maxlength !== typeof undefined && parseInt(maxlength) > 0) {
                    propertycontrol.val(maxlength);
                } else {
                    propertycontrol.val('');
                }
                break;

            case 'visibility':
                propertycontrol.removeAttr("checked");
                propertycontrol.prop('checked', false);

                var visibility = targetContainer.find('.fb-control').attr('data-visibility');

                if (typeof visibility !== typeof undefined && visibility > 0) {
                    propertycontrol.filter('[value="' + visibility + '"]').prop('checked', true);
                    propertycontrol.filter('[value="' + visibility + '"]').attr('checked', 'checked');
                } else {
                    propertycontrol.filter(':first').prop('checked', true);
                    propertycontrol.filter(':first').attr('checked', 'checked');
                }
                break;

            case 'formview':
                propertycontrol.removeAttr("checked");
                propertycontrol.prop('checked', false);

                var formview = targetContainer.find('.fb-control').attr('data-formview');

                if (typeof formview !== typeof undefined && formview !== false) {
                    var formViewArr = formview.split(",");
                    var filterString = '';

                    $.each(formViewArr, function (index, value) {
                        filterString += '[value="' + value + '"]' + (index == formViewArr.length - 1 ? '' : ',');
                    });

                    propertycontrol.filter(filterString).prop('checked', true);
                    propertycontrol.filter(filterString).attr('checked', 'checked');
                }
                break;

            case 'newudoptions':
                var udoptions = targetContainer.find('.fb-control').attr('data-newudoptions');

                var selectOptionsTemplateData = {};
                if (typeof udoptions !== typeof undefined && udoptions != '') {
                    selectOptionsTemplateData.options = udoptions.split(',');
                } else {
                    selectOptionsTemplateData.options = [''];
                }

                var templateName = 'form-field-options-template';
                var tempTemplate = $('#' + templateName).tmpl(selectOptionsTemplateData);

                control.find('.property-input').html(tempTemplate);
                break;

            default:
                var fieldAttribute = 'data-' + controlType;
                var attributeValue = targetContainer.find('.fb-control').attr(fieldAttribute);

                if (typeof attributeValue !== typeof undefined && attributeValue !== false) {
                    propertycontrol.val(formatString(attributeValue));
                } else {
                    resetFormFieldValue(propertycontrol);
                }
        }

        showHideChildrenProperties(control, controlType, true);
    }

    function applyRealtimeChanges(changeType, value) {
        var buttonControl;
        var propertycontrol = targetContainer.find('.fb-control');

        switch (changeType) {
            case 'categoryname':
                targetContainer.find('legend').text(value);
                break;

            case 'newcolumn':
            case 'allowtab':
                var fieldAttribute = 'data-' + changeType;
                if (value == 'true') {
                    targetContainer.attr(fieldAttribute, 'true');
                } else {
                    targetContainer.removeAttr(fieldAttribute);
                }
                break;

            case 'tabname':
                var fieldAttribute = 'data-' + changeType;
                if (value && value != '') {
                    targetContainer.attr(fieldAttribute, value);
                } else {
                    targetContainer.removeAttr(fieldAttribute);
                }
                break;

            case 'actionscopeid':
            case 'isflat':
            case 'actiongroup':
            case 'headertext':
            case 'commandname':
            case 'commandargument':
                var fieldAttribute = 'data-' + changeType;
                buttonControl = targetContainer.find('button');

                buttonControl.attr(fieldAttribute, value);

                if (changeType == 'headertext')
                    buttonControl.text(value);
                break;

            case 'label':
                targetContainer.find('.control-label').text(value);
                break;

            case 'name':
                var IsValidFieldName = validateFieldName(value);
                if (!IsValidFieldName) {
                    getPropertiesFor($('#field-property-table .form-control[data-field-property="name"]').closest('tr'));

                    alert('Field name contains invalid character. Only allowed character set is [A-Z, a-z, 0-9, _]');
                    return false;
                }
                
                var IsFormConsistDuplicateName = preventDuplicateControlName(value);
                if (IsFormConsistDuplicateName) {
                    getPropertiesFor($('#field-property-table .form-control[data-field-property="name"]').closest('tr'));

                    alert('Existing form control contains the same name in template.Please use different name.');
                    return false;
                }

                var oldNameValue = propertycontrol.attr('data-name');

                $('.fb-control[data-visibilityfield="' + oldNameValue + '"]').attr('data-visibilityfield', value);
                propertycontrol.attr('data-name', value);
                break;

            case 'required':
                var fieldAttribute = 'data-' + changeType;

                if (value == 'true') {
                    targetContainer.find('.' + changeType).removeClass('hide');
                    propertycontrol.attr(fieldAttribute, 'true');
                    propertycontrol.prop('required', true);
                } else {
                    targetContainer.find('.' + changeType).addClass('hide');
                    propertycontrol.removeAttr(fieldAttribute);
                    propertycontrol.prop('required', false);
                }
                break;

            case 'readonly':
                var fieldAttribute = 'data-' + changeType;

                if (value == 'true') {
                    propertycontrol.attr(fieldAttribute, 'true');
                    propertycontrol.attr('readonly', 'readonly');
                } else {
                    propertycontrol.removeAttr(fieldAttribute);
                    propertycontrol.removeAttr('readonly');
                }
                break;

            case 'maxlength':
                if (value != '') {
                    propertycontrol.attr('maxlength', value);
                    propertycontrol.attr('data-maxlength', value);
                } else {
                    propertycontrol.removeAttr('maxlength');
                    propertycontrol.removeAttr('data-maxlength');
                }
                break;

            case 'ismultiselect':
                var fieldAttribute = 'data-' + changeType;
                if (value != '') {
                    propertycontrol.attr(fieldAttribute, parseString(value));
                    if (value == 'true')
                        propertycontrol.attr('multiple', 'multiple');
                    else
                        propertycontrol.removeAttr('multiple');
                } else {
                    propertycontrol.removeAttr(fieldAttribute);
                    propertycontrol.removeAttr('multiple');
                }
                break;

            case 'newudoptions':
                var value = $('#field-property-table .form-control[data-field-property="' + changeType + '"]')
                    .map(function () { return this.value.trim() != '' ? this.value : ''; })
                    .get()
                    .filter(function (v) { return v && v.trim() !== '' })
                    .join(',');

                var fieldAttribute = 'data-' + changeType;
                if (value != '')
                    propertycontrol.attr(fieldAttribute, parseString(value));
                else
                    propertycontrol.removeAttr(fieldAttribute);
                break;

            case 'formview':
                var value = $('#field-property-table .form-control[data-field-property="' + changeType + '"]:checked')
                    .map(function () { return this.value; })
                    .get()
                    .join(',');

            default:
                var fieldAttribute = 'data-' + changeType;
                if (value != '')
                    propertycontrol.attr(fieldAttribute, parseString(value));
                else
                    propertycontrol.removeAttr(fieldAttribute);
        }

        if (changeType == 'categoryname' || changeType == 'newcolumn' || changeType == 'allowtab' || changeType == 'tabname') {
            addChangeAttribute(targetContainer);
        } else if (changeType == 'actionscopeid' || changeType == 'isflat' || changeType == 'actiongroup' || changeType == 'headertext' || changeType == 'commandname' || changeType == 'commandargument') {
            addChangeAttribute(buttonControl)
        } else {
            addChangeAttribute(propertycontrol);
        }
    }

    function addChangeAttribute(container) {
        container.attr('data-changed', 'true');
    }
    

    function getTemplateByType(controltype) {
        var template = '';
        var templateName = '';
        var TemplateData = {};

        controltype = controltype.toLowerCase();

        if (controltype == 'section') {
            TemplateData = {
                ControlType: controltype,
                CategoryName: getSectionName(),
                CategoryId: '',
                AllowTab: 'false',
                FieldTabID: '',
                TabName: ''
            };

            templateName = 'form-layout-' + controltype + '-template';
        } else if (controltype == 'dropdownlist' || controltype == 'dropdownlist' || controltype == 'radiolist' || controltype == 'checkboxlist' || controltype == 'lookuplist' || controltype == 'multilinetext' || controltype == 'richtext') {
            TemplateData = getFieldValuesObjectByType(controltype);
            templateName = 'form-field-' + controltype + '-template';
        } else if (controltype == 'button') {
            TemplateData = {
                ControlType: controltype,
                ActionScopeID: '',
                IsFlat: 'false',
                ActionGroup: '',
                HeaderText: "Button"
            };
            templateName = 'form-field-' + controltype + '-template';
        } else {
            TemplateData = getFieldValuesObjectByType(controltype);
            templateName = 'form-field-common-template';
        }

        template = $('#' + templateName).tmpl(TemplateData);
        template.addClass('drop-item');

        templateActionButtonsName = 'form-field-action-buttons-template';
        templateActionButtons = $('#' + templateActionButtonsName).tmpl();
        template.prepend(templateActionButtons);
        return template;
    }

    function getFieldValuesObjectByType(controlType) {
        var TemplateData = {};

        var fieldName = getControlNameByType(controlType);
        var fieldCaption = getDummyControlLabel(controlType, true);
        var controlData = getControlSpecificData(controlType);

        $.extend(TemplateData, controlData);

        TemplateData.ControlType = controlType;
        TemplateData.FieldCaption = fieldCaption;
        TemplateData.FieldName = fieldName;
        TemplateData.Required = 'false';
        TemplateData.IsReadOnly = 'false';
        TemplateData.VFDIsVisible = 'false';
        TemplateData.FormViews = 'grid,create,edit';

        return TemplateData;
    }

    function getControlSpecificData(controlName) {
        var data = {};

        if (controlName == 'checkboxlist' || controlName == 'radiolist' || controlName == 'lookuplist') {
            data.FieldTypeID = getOptionIdByOptionText('fieldtype', 'integer');
        } else if (controlName == 'dropdownlist') {
            data.FieldTypeID = getOptionIdByOptionText('fieldtype', 'integer');
            data.isMultiSelect = '';
        } else if (controlName == 'currency') {
            data.FieldTypeID = getOptionIdByOptionText('fieldtype', 'currency');
            data.DataFormatString = getOptionIdByOptionText('dataformatstring', 'currency');
        } else if (controlName == 'double') {
            data.FieldTypeID = getOptionIdByOptionText('fieldtype', 'double');
            data.MaskType = getOptionIdByOptionText('masktype', 'number');
        } else if (controlName == 'password') {
            data.FieldTypeID = getOptionIdByOptionText('fieldtype', 'string');
            data.Maxlength = 20;
            data.Columns = 40;
        } else if (controlName == 'date' || controlName == 'datetime') {
            data.FieldTypeID = getOptionIdByOptionText('fieldtype', 'date and time');
            data.Columns = 15;
        } else if (controlName == 'e-sign') {
            data.FieldTypeID = getOptionIdByOptionText('fieldtype', 'e-sign');
        } else if (controlName == 'e-pin') {
            data.FieldTypeID = getOptionIdByOptionText('fieldtype', 'e-pin');
            data.Maxlength = 10;
            data.Columns = 40;
        } else if (controlName == 'richtext') {
            data.FieldTypeID = getOptionIdByOptionText('fieldtype', 'string');
            data.Maxlength = 3000;
        } else if (controlName == 'singlelinetext') {
            data.FieldTypeID = getOptionIdByOptionText('fieldtype', 'string');
            data.Maxlength = 500;
            data.Columns = 80;
        } else if (controlName == 'multilinetext') {
            data.FieldTypeID = getOptionIdByOptionText('fieldtype', 'string');
            data.Maxlength = 500;
            data.Columns = 80;
            data.Rows = 5;
        } else {
            data.FieldTypeID = getOptionIdByOptionText('fieldtype', 'string');
        }

        return data;
    }

    function getOptionIdByOptionText(propertyType, optionText) {
        var fieldTypesOptions = $('#field-property-table .form-control[data-field-property="' + propertyType + '"] option');

        var filteredOption = fieldTypesOptions.filter(function () {
            return $(this).text().toLowerCase().indexOf(optionText) > -1;
        });

        return filteredOption.val();
    }

    function getControlNameByType(controlName) {
        var selector = '';

        controlName = controlName.replace(/-/g, '_');

        if (controlName == 'dropdownlist') {
            selector = 'select[data-name^="' + controlName + '"].fb-control';
        } else if (controlName == 'multilinetext' || controlName == 'richtext') {
            selector = 'textarea[data-name^="' + controlName + '"].fb-control';
        } else {
            selector = 'input[data-name^="' + controlName + '"].fb-control';
        }

        var controlIdsArray = $(selector).map(function () { return parseInt($(this).attr('data-name').replace(controlName + '_', '')); }).get();

        if (controlIdsArray.length > 0) {
            var lastControlId = Math.max.apply(Math, controlIdsArray);

            if (lastControlId > 0) {
                controlName += '_' + (lastControlId + 1);
            }
        } else {
            controlName += '_1';
        }


        return controlName;
    }

    function getSectionName() {
        var sectionsCount = $('#form-design-area .drop-item[data-control-type="section"]').length + 1;
        var sectionName = 'Category ' + sectionsCount;
        return sectionName;
    }

    function getDummyControlLabel(controlType, withoutLabel) {
        var label = controlType;

        label = label.toLowerCase().replace('list', '');
        label = label.charAt(0).toUpperCase() + label.slice(1);

        label += (withoutLabel == true ? ' Label' : '');
        return label;
    }

    function changeNamesOfDuplicateControls(element, controlType) {
        switch (controlType) {
            case 'row':
            case 'table':
                element.find('.drop-item').each(function () {
                    var childControl = $(this).attr('data-control-type');
                    changeNamesOfDuplicateControls($(this), childControl);
                });
                break;

            case 'radiolist':
            case 'checkboxlist':
            case 'inputbox':
            case 'dropdownlist':
            case 'textarea':
                var newname = getControlNameByType(controlType);
                element.find('.fb-control').attr('name', newname);
                break;

        }
    }

    function toggleSaveButton(status) {
        if (status == true) {
            $('#isFormAltered').val(1);
            $('.action-button[data-action="save"]').removeAttr("disabled");
        } else {
            $('#isFormAltered').val(0);
            $('.action-button[data-action="save"]').attr("disabled", "disabled");
        }
    }

    function showHideChildrenProperties($rowelement, property, loadProperties) {

        if ($rowelement.hasClass('parent-property')) {
            var childProperties = $('#field-property-table tr[data-child-property="' + property + '"]');
            var childPropertiesControls = childProperties.find('.form-control');

            if (loadProperties == false) {
                var fieldProperty = '';
                childPropertiesControls.each(function (index, elem) {
                    resetFormFieldValue($(elem));

                    fieldProperty = $(elem).attr('data-field-property');
                    targetContainer.find('.fb-control').removeAttr(fieldProperty)
                    targetContainer.find('.fb-control').removeAttr('data-' + fieldProperty);
                });
                debugger;
                if (property == 'udcategory') {
                    var selectOptionsTemplateData = {};
                    selectOptionsTemplateData.options = [''];

                    var templateName = 'form-field-options-template';
                    var tempTemplate = $('#' + templateName).tmpl(selectOptionsTemplateData);

                    $('#field-property-table tr[data-child-property="' + property + '"].options-property').find('.property-input').html(tempTemplate);
                }
            }

            childProperties.hide();

            var elementValue = getFormFieldValue($rowelement.find('.form-control'), true);

            if (elementValue && elementValue != '') {
                if ($rowelement.hasClass('value-based')) {
                    elementValue = elementValue.replace(/ /g, '').toLowerCase();
                    childProperties.filter(".data-" + property + "-" + elementValue).show();
                    childProperties = childProperties.filter(".field-property");
                } else if ($rowelement.hasClass('single-value-based')) {
                    var singleValue = $rowelement.attr('data-single-value');
                    singleValue = singleValue.replace(/ /g, '').toLowerCase();
                    elementValue = elementValue.replace(/ /g, '').toLowerCase();
                    if (elementValue == singleValue) {
                        childProperties.filter(".data-" + property + "-" + elementValue).show();
                    } else {
                        childProperties.filter(".data-" + property + "-other").show();

                        if (property == 'itemsdatacontroller') {
                            getTableColumnList(-1, elementValue, fillColumnList);
                        }
                    }
                } else {
                    childProperties.show();
                }

                if (loadProperties == true) {
                    $.each(childProperties, function () {
                        getPropertiesFor($(this));
                    });
                }
            }
        }
    }

    function getFormFieldValue($element, labelValue) {
        var elementValue = '';

        if ($element.length > 1) {
            var $firstElement = $($element[0]);
            if ($firstElement.prop('tagName').toLowerCase() == 'select') {
                elementValue = $firstElement.val();
                if (labelValue == true && (elementValue && elementValue != ''))
                    elementValue = $firstElement.find("option:selected").text();
            } else if ($firstElement.prop('tagName').toLowerCase() == 'input'
                && ($firstElement.prop('type').toLowerCase() == 'radio' || $firstElement.prop('type').toLowerCase() == 'checkbox')) {
                elementValue = $element.filter(":checked").val();
            } else {
                elementValue = $firstElement.val();
            }
        } else {
            if ($element.prop('tagName').toLowerCase() == 'select') {
                elementValue = $element.val();
                if (labelValue == true && (elementValue && elementValue != ''))
                    elementValue = $element.find("option:selected").text();
            } else if ($element.prop('tagName').toLowerCase() == 'input'
                && ($element.prop('type').toLowerCase() == 'radio' || $element.prop('type').toLowerCase() == 'checkbox')) {
                elementValue = $element.filter(":checked").val();
            } else {
                elementValue = $element.val();
            }
        }

        return elementValue;
    }

    function resetFormFieldValue($element) {
        var elementValue = '';

        if ($element.length > 1) {
            var $firstElement = $($element[0]);
            if ($firstElement.prop('tagName').toLowerCase() == 'input'
                && ($firstElement.prop('type').toLowerCase() == 'radio' || $firstElement.prop('type').toLowerCase() == 'checkbox')) {

                $element.removeAttr("checked");
                $element.prop('checked', false);

                $element.filter('[value="false"]').prop('checked', true);
                $element.filter('[value="false"]').attr('checked', 'checked');
            } else {
                $firstElement.val('');
            }
        } else if ($element.length == 1) {
            if ($element.prop('tagName').toLowerCase() == 'input'
                && ($element.prop('type').toLowerCase() == 'radio' || $element.prop('type').toLowerCase() == 'checkbox')) {

                $element.removeAttr("checked");
                $element.prop('checked', false);

                $element.filter('[value="false"]').prop('checked', true);
                $element.filter('[value="false"]').attr('checked', 'checked');
            } else {
                $element.val('');
            }
        }
    }
    
    function bindFormFieldTemplate(formField) {
        var templateName = '';
        var templateActionButtonsName = 'form-field-action-buttons-template';
        var templateActionButtons = $('#' + templateActionButtonsName).tmpl();

        var controlName = formField.ControlType;

        if (formField.VFDIsVisible == true || controlName == 'singlelinetext' || controlName == 'date' || controlName == 'datetime' || controlName == 'currency' || controlName == 'double' || controlName == 'password' || controlName == 'e-sign' || controlName == 'e-pin') {
            templateName = 'form-field-common-template';
        } else {
            templateName = 'form-field-' + controlName + '-template';
        }

        template = $('#' + templateName).tmpl(formField);
        template.prepend(templateActionButtons);
        template.addClass('drop-item');

        if (controlName == 'button')
            template.addClass('btn-tool');
        else
            template.addClass('form-tool');

        return template;
    }

    function validateFieldName(name) {
        var regx = /^[A-Za-z0-9_]+$/;

        if (!regx.test(name))
            return false;

        return true;
    }

    function preventDuplicateControlName(name) {
        var controlsWithSameNameCount = $('#form-design-area .fb-control[data-name="' + name + '"]');

        if (controlsWithSameNameCount.length > 0) {
            return true;
        }
        return false;
    }

    function parseString(string) {
        return string.replace(/"/g, '\\"');
    }

    function formatString(string) {
        return string.replace(/\\"/g, '"');
    }

    function showCommandArgumentDialog() {
        var commandArgumentSelector = '#CommandArgumentPopup';

        var fieldAttribute = 'data-commandargument';
        var buttonControl = targetContainer.find('button');
        var commandArgumentValue = buttonControl.attr(fieldAttribute);
        
        if (typeof commandArgumentValue !== typeof undefined && commandArgumentValue != "") {
            var commandArgumentsObj = ExtractCommandArgumentFields(commandArgumentValue);

            $(commandArgumentSelector + ' select[name="arg_navigationform"]').val(commandArgumentsObj._navigationForm);
            $(commandArgumentSelector + ' select[name="arg_commandname"]').val(commandArgumentsObj._commandName);
            $(commandArgumentSelector + ' select[name="arg_commandargument"]').val(commandArgumentsObj._commandArgument);
        } else {
            $(commandArgumentSelector).find('select').find('option:first').prop('selected', true);
        }

        $(commandArgumentSelector).modal('show');
    }

    function ExtractCommandArgumentFields(commandArgumentUrl) {
        var commandArgumentsObject = {};
        commandArgumentsObject = getUrlVars(commandArgumentUrl);
        
        var pageName = '';
        var urlArr = commandArgumentUrl.split('?');
        if (urlArr.length > 0) {
            pageName = getPageNameFromURL(urlArr[0]);
        }

        commandArgumentsObject._navigationForm = pageName.replace('.aspx', '');

        return commandArgumentsObject;
    }

    function GenerateCmdArgumentUrl() {
        var commandArgumentSelector = '#CommandArgumentPopup';

        var error = false;
        var field = '';
        var fieldName = '';

        var argsData = {};

        $(commandArgumentSelector + " [data-required='true']").each(function () {
            field = $(this).attr('data-field');
            fieldName = $(this).attr('name');
            if (!ElementValidate(this)) {
                error = true;
                return false;
            }

            argsData[fieldName] = $(this).val();
        });

        if (error) {
            ShowMessage($(commandArgumentSelector + " .message-box"), field + ' is required.', 'alert-danger');
            return false;
        }

        var commandArgUrlObj = $.tmpl("~/Pages/${arg_navigationform}.aspx?ClientID={ClientID}&_controller=${arg_navigationform}&_commandName=${arg_commandname}&_commandArgument=${arg_commandargument}", argsData);
        var commandArgUrl = $(commandArgUrlObj).text();
        var fieldType = 'commandargument';

        $('#field-property-table [data-field-property="' + fieldType +'"]').val(commandArgUrl);

        applyRealtimeChanges(fieldType, commandArgUrl);
        toggleSaveButton(true);
        $(commandArgumentSelector).modal('hide');
    }

    /** Action function **/

    function fillFormFields() {
        //Render Buttons
        RenderButtonFields();

        // Render Layout Template
        RenderLayoutTemplate();

        // Render Master Form
        RenderFormFileds(masterFormFieldsResponse, "#root .drag-drop-area");

        // Render Main Form
        RenderFormFileds(formFieldsResponse, "#form-design-area");

        // Show Default Fields
        if (defaultFormFieldsResponse && defaultFormFieldsResponse.length > 0) {
            $("#form-tools-container .default-tool-controls").parents(".panel-group").removeClass("hide");
            $.each(defaultFormFieldsResponse, function (index, option) {
                $.tmpl('<tr><td class="form-group"><a class="form-tool" href="javascript:void(0);" data-type="defaultfield" data-index="${index}">${FieldName}</a></td></tr>', $.extend({}, option, { index: index })).appendTo("#form-tools-container .default-tool-controls");
            });
        }
    }

    function RenderLayoutTemplate() {
        if (formDetailsResponse && formDetailsResponse != '' && formDetailsResponse.length > 0) {
            var formDetails = formDetailsResponse[0];

            var layoutTemplateObject = {};
            layoutTemplateObject.FormName = formDetails.FormName;
            layoutTemplateObject.RootFormId = formDetails.RootFormId;
            layoutTemplateObject.RootFormName = formDetails.RootFormName;
            layoutTemplateObject.FormTypeId = formDetails.FormTypeId;

            if (formDetails.ChildForms && formDetails.ChildForms != '') {
                layoutTemplateObject.ChildForms = JSON.parse(formDetails.ChildForms);
            }

            var layoutTemplateName = 'form-layout-template';
            var layoutTemplate = $('#' + layoutTemplateName).tmpl(layoutTemplateObject);
            $("#drag-area-container").prepend(layoutTemplate);
        }
    }

    function RenderButtonFields() {
        if(buttonFieldsResponse && buttonFieldsResponse.length > 0) {
            var template = '';

            $.each(buttonFieldsResponse, function (index, option) {
                template = bindFormFieldTemplate(option);
                var $el = $(template).appendTo("#btns-design-area");
                applyDroppable($el, option.ControlType);
            });
        }
    }

    function RenderFormFileds(formFieldsResponse, containerSelector) {
        if (formFieldsResponse && formFieldsResponse.length > 0) {
            var template = '';

            var categoryObj = {};
            var sectionTemplate = '';
            var ControlType = '';

            $.each(formFieldsResponse, function (index, option) {
                template = bindFormFieldTemplate(option);

                if (option.CategoryID > 0) {
                    var categoryElement = containerSelector +' >.drop-item[data-categoryid="' + option.CategoryID + '"]';
                    if ($(categoryElement).length > 0) {
                        var $el = $(template).appendTo(categoryElement + '>fieldset>div[class*="col-"]');
                    } else {
                        categoryObj = {};
                        sectionTemplate = '';
                        ControlType = 'section';

                        categoryObj.CategoryID = option.CategoryID;
                        categoryObj.CategoryName = option.CategoryName;
                        categoryObj.ControlType = ControlType;
                        categoryObj.NewColumn = option.NewColumn;
                        categoryObj.AllowTab = option.FieldTabID > 0 ? 'true' : 'false';
                        categoryObj.FieldTabID = option.FieldTabID;
                        categoryObj.TabName = option.TabName;

                        templateName = 'form-layout-section-template';
                        sectionTemplate = $('#' + templateName).tmpl(categoryObj);
                        sectionTemplate.addClass('drop-item');

                        templateActionButtonsName = 'form-field-action-buttons-template';
                        templateActionButtons = $('#' + templateActionButtonsName).tmpl();
                        sectionTemplate.prepend(templateActionButtons);

                        sectionTemplate.find('fieldset>div[class*="col-"]').append(template);

                        var $el = $(sectionTemplate).appendTo(containerSelector);
                        applyDroppable($el, ControlType);
                    }
                } else {
                    var $el = $(template).appendTo("#form-design-area");
                }
            });
        }
    }

    function saveFormFields() {
        html2canvas(document.querySelector("#form-design-area")).then(canvas => {
            var formFieldsJson = GenerateFormFieldsJSON();
            var buttonFieldsJson = GenerateButtonFieldsJSON();
            
            var formDesignerBase64 = canvas.toDataURL("image/jpeg");

            var dataToPost = {
                FormData: JSON.stringify(formFieldsJson),
                ButtonData: JSON.stringify(buttonFieldsJson),
                ImageBase64: formDesignerBase64.split(',')[1]
            };

            postJSON(dataToPost, _webAPIURL + 'SaveFormData&FormId=' + formId, "Post", FormSubmitted, ErrorCallBack, false);
        });
    }

    function FormSubmitted(result) {
        if (result != null & result.data != null & result.data.Result != null & result.data.Result == "True") {
            toggleSaveButton(false);
            alert("Form Fields Saved in database");
            location.href = FormListLink;
        } else {
            alert("Error Occured while saving Fields in the database");
        }
    }

    function GenerateFormFieldsJSON() {
        var Control = {};
        var ConrtolsCollection = [];

        var field;
        var fieldLabel = '';
        var fieldtype = '';

        $("#form-design-area > .drop-item").each(function () {
            var $formField = $(this);
            fieldtype = $formField.attr('data-control-type');

            if (fieldtype == 'section') {
                var DefaultControlProps = {
                    newcolumn: $formField.attr('data-newcolumn'),
                    categoryid: $formField.attr('data-categoryid'),
                    categoryname: $formField.find('legend').text(),
                    tabid: $formField.attr('data-tabid'),
                    tabname: $formField.attr('data-tabname'),
                    changed: $formField.attr('data-changed')
                };

                $formField.find('.drop-item').each(function () {
                    Control = {};
                    var $childFormField = $(this);
                    Control = ExtractFormFieldObject($childFormField);

                    $.extend(Control, DefaultControlProps);
                    ConrtolsCollection.push(Control);
                });
            } else {
                Control = ExtractFormFieldObject($formField);
                ConrtolsCollection.push(Control);
            }
        });

        var ControlCollectionObj = {
            ConrtolsCollection: {
                Control: ConrtolsCollection
            }
        }

        return ControlCollectionObj;
    }


    function GenerateButtonFieldsJSON() {
        var Control = {};
        var ConrtolsCollection = [];

        var field;
        var fieldtype = '';

        $("#btns-design-area > .drop-item").each(function () {
            var $formFieldBtn = $(this);
            fieldtype = $formFieldBtn.attr('data-control-type');

            Control = {};
            Control = ExtractFormFieldButtonObject($formFieldBtn);
            ConrtolsCollection.push(Control);
        });

        var ControlCollectionObj = {
            ConrtolsCollection: {
                Control: ConrtolsCollection
            }
        }

        return ControlCollectionObj;
    }

    function ExtractFormFieldButtonObject($formField) {
        var Control = {};

        var field = $formField.find('button');

        $.each(field.get(0).attributes, function (i, attrib) {
            if (attrib.name.startsWith('data-')) {
                Control[attrib.name.replace('data-', '')] = attrib.value && attrib.value != '' ? attrib.value : '';
            }
        });

        return Control;
    }

    function ExtractFormFieldObject($formField) {
        var Control = {};

        var field;
        var fieldLabel = '';

        field = $formField.find('.fb-control');

        //var controlType = $(this).attr('data-control-type');

        fieldLabel = $formField.find(".control-label").text();
        fielLabel = fieldLabel ? fieldLabel.trim() : '';
        Control['label'] = fielLabel;

        $.each(field.get(0).attributes, function (i, attrib) {
            if (attrib.name.startsWith('data-')) {
                Control[attrib.name.replace('data-', '')] = attrib.value && attrib.value != '' ? attrib.value : '';
            }
        });

        return Control;
    }

    function init() {
        performOnLoadActions();
        fillFormFields();
        bindNavigateAway();
        bindFormBuilderBasicActions();
        bindBasicActions();
        bindDragAndDrop();
    }

    return {
        init: init,
        bindBasicActions: bindBasicActions,
        RenderButtonFields: RenderButtonFields,
        RenderFormFileds: RenderFormFileds
    }
}();

