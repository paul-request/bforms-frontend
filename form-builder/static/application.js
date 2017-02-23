/* global $ */
/* global GOVUK */

// Warn about using the kit in production
if (
  window.sessionStorage && window.sessionStorage.getItem('prototypeWarning') !== 'false' &&
  window.console && window.console.info
) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
  window.sessionStorage.setItem('prototypeWarning', true)
}

$(document).ready(function () {
  // Use GOV.UK selection-buttons.js to set selected
  // and focused states for block labels
  var $blockLabels = $(".block-label input[type='radio'], .block-label input[type='checkbox']")
  new GOVUK.SelectionButtons($blockLabels) // eslint-disable-line

  // Use GOV.UK shim-links-with-button-role.js to trigger a link styled to look like a button,
  // with role="button" when the space key is pressed.
  GOVUK.shimLinksWithButtonRole.init()

  // Show and hide toggled content
  // Where .block-label uses the data-target attribute
  // to toggle hidden content
  var showHideContent = new GOVUK.ShowHideContent()
  showHideContent.init()
  
  var uploader = $('#form-uploader-drop');
  var uploaderFiles = uploader.find('#form-uploader-files');
  
  if (uploader.length) {
    var fileUploader = new Dropzone('#file-uploader-area', {
      url: uploader.attr('action'),
      paramName: 'file',
      previewsContainer: document.getElementById('file-uploader-files__data'),
      maxFiles: 5,
      uploadMultiple: false,
      acceptedFiles: '*.csv,text/csv,application/csv,application/vnd.ms-excel',
      previewTemplate: document.getElementById('file-uploader-file-preview').innerHTML,
      createImageThumbnails: false,
      thumbnail: function() { return false; },
      error:  function (file, message) {
        if (file.previewElement) {
          file.previewElement.classList.add("file-uploader--error");
        }
      },
      init: function() {
        this.on("addedfile", function(file) {
          if (uploaderFiles.hasClass('js-hidden')) {
            uploaderFiles.removeClass('js-hidden');
          }
        });
      }
    });
  }
})