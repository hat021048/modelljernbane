function Fram_S () {
    pins.digitalWritePin(DigitalPin.P15, 0)
    pins.digitalWritePin(DigitalPin.P16, 1)
    if (Speed <= Cruising && Stoppsignal_S == 1) {
        Speed += Aksellerasjon
    } else if (Stoppsignal_S == 0 && Speed > 0) {
        Speed += Brems
    } else if (Stoppsignal_S == 0 && Speed <= 0) {
        StoppSignal_B = 1
        Drive = 0
    }
}
function Bak () {
    pins.digitalWritePin(DigitalPin.P15, 1)
    pins.digitalWritePin(DigitalPin.P16, 0)
    if (Speed < ReverseSpeed && StoppSignal_B == 1) {
        Speed += Aksellerasjon
    } else if (StoppSignal_B == 0 && Speed >= 0) {
        Speed += Brems
    } else if (StoppSignal_B == 0 && Speed <= 0) {
        StoppSignal_F = 1
        Stoppsignal_S = 1
        if (Pens == 0) {
            Pens = 1
            PensRight()
            Drive = 1
        } else {
            Pens = 0
            PensLeft()
            Drive = -1
        }
    }
}
function PensRight () {
    pins.digitalWritePin(DigitalPin.P0, 1)
    control.waitMicros(20000)
    pins.digitalWritePin(DigitalPin.P0, 0)
}
function Fram () {
    pins.digitalWritePin(DigitalPin.P15, 0)
    pins.digitalWritePin(DigitalPin.P16, 1)
    if (Speed <= Cruising && StoppSignal_F == 1) {
        Speed += Aksellerasjon
    } else if (StoppSignal_F == 0 && Speed > 0) {
        Speed += Brems
    } else if (StoppSignal_F == 0 && Speed <= 0) {
        StoppSignal_B = 1
        Drive = 0
    }
}
function PensLeft () {
    pins.digitalWritePin(DigitalPin.P1, 1)
    control.waitMicros(20000)
    pins.digitalWritePin(DigitalPin.P1, 0)
}
let Pens = 0
let StoppSignal_B = 0
let Stoppsignal_S = 0
let StoppSignal_F = 0
let ReverseSpeed = 0
let Cruising = 0
let Drive = 0
let Brems = 0
let Aksellerasjon = 0
let Speed = 0
basic.showIcon(IconNames.Yes)
Speed = 0
Aksellerasjon = 2
Brems = -6
Drive = 1
Cruising = 400
ReverseSpeed = 255
StoppSignal_F = 1
Stoppsignal_S = 1
StoppSignal_B = 1
Pens = 0
serial.setBaudRate(BaudRate.BaudRate115200)
basic.forever(function () {
    if (StoppSignal_F == 1) {
        StoppSignal_F = pins.digitalReadPin(DigitalPin.P12)
    }
    if (StoppSignal_B == 1) {
        StoppSignal_B = pins.digitalReadPin(DigitalPin.P13)
    }
    if (Stoppsignal_S == 1) {
        Stoppsignal_S = pins.digitalReadPin(DigitalPin.P8)
    }
    if (Drive == 1) {
        Fram()
    } else if (Drive == 0) {
        Bak()
    } else if (Drive == -1) {
        Fram_S()
    }
    pins.analogWritePin(AnalogPin.P14, Speed)
    serial.writeValue("x", Stoppsignal_S)
})
