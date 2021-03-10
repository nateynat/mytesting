SetupDoctor = function(data) {
    $(".doctor2-list").html("");

    if (data.length > 0) {
        $.each(data, function(i, doctor){
            var element = '<div class="doctor-list" id="doctorid-'+i+'"> <div class="doctor-list-firstletter">' + (doctor.name).charAt(0).toUpperCase() + '</div> <div class="doctor-list-fullname">' + doctor.name + '</div> <div class="doctor-list-call"><i class="fas fa-phone"></i></div> </div>'
            $(".doctor2-list").append(element);
            $("#doctorid-"+i).data('doctorData', doctor);
        });
    } else {
        var element = '<div class="doctor-list"><div class="no-doctor">There are no doctor available..</div></div>'
        $(".doctor2-list").append(element);
    }
}

$(document).on('click', '.doctor-list-call', function(e){
    e.preventDefault();

    var doctorData = $(this).parent().data('doctorData');
    
    var cData = {
        number: doctorData.phone,
        name: doctorData.name
    }

    $.post('http://coderc-phone/CallContact', JSON.stringify({
        ContactData: cData,
        Anonymous: QB.Phone.Data.AnonymousCall,
    }), function(status){
        if (cData.number !== QB.Phone.Data.PlayerData.charinfo.phone) {
            if (status.IsOnline) {
                if (status.CanCall) {
                    if (!status.InCall) {
                        if (QB.Phone.Data.AnonymousCall) {
                            QB.Phone.Notifications.Add("fas fa-phone", "Phone", "You started a secret search!");
                        }
                        $(".phone-call-outgoing").css({"display":"block"});
                        $(".phone-call-incoming").css({"display":"none"});
                        $(".phone-call-ongoing").css({"display":"none"});
                        $(".phone-call-outgoing-caller").html(cData.name);
                        QB.Phone.Functions.HeaderTextColor("white", 400);
                        QB.Phone.Animations.TopSlideUp('.phone-application-container', 400, -160);
                        setTimeout(function(){
                            $(".doctor-app").css({"display":"none"});
                            QB.Phone.Animations.TopSlideDown('.phone-application-container', 400, 0);
                            QB.Phone.Functions.ToggleApp("phone-call", "block");
                        }, 450);
    
                        CallData.name = cData.name;
                        CallData.number = cData.number;
                    
                        QB.Phone.Data.currentApplication = "phone-call";
                    } else {
                        QB.Phone.Notifications.Add("fas fa-phone", "Phone", "You are busy!");
                    }
                } else {
                    QB.Phone.Notifications.Add("fas fa-phone", "Phone", "The number you are calling is busy!");
                }
            } else {
                QB.Phone.Notifications.Add("fas fa-phone", "Phone", "The person's phone is off!");
            }
        } else {
            QB.Phone.Notifications.Add("fas fa-phone", "Phone", "You can't call your number..");
        }
    });
});
