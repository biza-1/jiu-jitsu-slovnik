// get data using ID from DB || BIZA
var id = getAllUrlParams().id;
getLabelContains(id);
// on click when wants to remove STITEK
$("#stitkyResult").on("click", ".modalStitkyRemove", function(e) {
    // to get id of STITEK
    var stitekID = $(this).data("id");
    // to get all oznacene
    var vsechnyOznacene = $(this).data("idofremove");
    vsechnyOznacene = JSON.parse("[" + vsechnyOznacene + "]");
    var nameOfTehcniques = $(this).data("name");
    removeLabelFromWord(stitekID, vsechnyOznacene, nameOfTehcniques, 1);
});
// after getting data a on document load show result