$(document).ready(function(){
    var morphTypes = [];
    $.ajax({
        dataType: "json",
        url: "./public/json/morphTypes.json",
        success: function(data){
            $.each(data, function(key, morphType) {
                morphTypes.push(morphType);
                $('#addMorphTypeCreature').append('<option value="'+morphType.hitZones+'">'+morphType.name+'</option>');
            });
        }
    });
});

function addCreatureToFight(){
    var bodyParts = $('#addMorphTypeCreature').val().split(",");
    $('#creatures').append(constructCreatureBlock(bodyParts));
}

function deleteBlock(block){
    block.remove();
}

function addHitZone(block){
    var newBodyPartTr =
        "<tr class='hit-zone'>" +
            "<td class='no-padding' width='60%'><input class='hit-zone-input' type='text' placeholder='Zone de dégâts' value=''></td>" +
            "<td class='no-padding' width='30%'><input class='hp-input' type='number' value='0'></td>" +
            "<td class='text-center' width='10%'><i class='fa fa-minus-circle' onclick='deleteBlock($(this).parent().parent())' title='Supprimer la zone de dégâts'></i></td>" +
        "</tr>";
    var lastTrHitZone = $('#' + block.getAttribute('id') + ' tr.hit-zone').last();
    if(lastTrHitZone.length > 0){
        lastTrHitZone.after(newBodyPartTr);
    } else {
        $('#' + block.getAttribute('id') + ' tr.add-hit-zone').before(newBodyPartTr);
    }

}

function constructCreatureBlock(bodyParts){

    var contentBodyPartsBlock = "";
    for(var key in bodyParts){
        contentBodyPartsBlock +=
            "<tr class='hit-zone'>" +
                "<td width='60%'>" + bodyParts[key] + "</td>" +
                "<td class='no-padding' width='30%'><input class='hp-input' type='number' value='0'></td>" +
                "<td class='text-center' width='10%'><i class='fa fa-minus-circle tip' onclick='deleteBlock($(this).parent().parent())'><span>Cette créature ne s'encombre pas de membres inutiles.</span></i></td>" +
            "</tr>";
    }

    var nbCreaturesInput = $('#nbCreatures');
    var nbCreatures = nbCreaturesInput.val();
    nbCreaturesInput.val(nbCreatures + 1);

    var blockId = "creature" + nbCreatures;

    var creatureBlock =
        "<div id='" + blockId + "' class='col-md-4 col-sm-6 col-xs-12 mt-3'>" +
            "<table class='creature-table table table-bordered table-striped'>" +
                "<thead>" +
                    "<tr>" +
                        "<td colspan='3' class='no-padding'><input class='name-input' type='text' placeholder='Nom de la créature' value=''></td>" +
                    "</tr>" +
                "</thead>" +
                "<tbody>" +
                    contentBodyPartsBlock +
                    "<tr class='add-hit-zone'>" +
                        "<td colspan='3' class='text-center'>" +
                            "<div class='d-inline-block tip'><img src='./public/img/goblin.png' width='50px' onclick='addHitZone(" + blockId + ")'><span>Ajouter une zone de dégâts</span></div>" +
                            "<div class='d-inline-block ml-5'></div>" +
                            "<div class='d-inline-block tip'><img src='./public/img/skull.png' width='50px' onclick='deleteBlock(" + blockId + ")'><span>Cette créature est trop faible, elle est lamentablement décédée !</span></div>" +
                        "</td>" +
                    "</tr>" +
                "</tbody>" +
            "</table>" +
        "</div>";

    return creatureBlock;
}