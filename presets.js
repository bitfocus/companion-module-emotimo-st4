const { combineRgb } = require('@companion-module/base')

let { MODELS, SERIES_SPECS } = require('./models.js')

module.exports = {
    initPresets: function () {
        let presets = {}
        let SERIES = {}

        const foregroundColor = combineRgb(255, 255, 255) // White
        const backgroundColorRed = combineRgb(255, 0, 0) // Red
        const backgroundColorGreen = combineRgb(0, 255, 0) // Green
        const backgroundColorOrange = combineRgb(255, 102, 0) // Orange

        // Variables for Base64 image data do not edit
        let image_up =
        'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6AQMAAAApyY3OAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAIFJREFUKM+90EEKgzAQRmFDFy49ghcp5FquVPBighcRegHBjWDJ68D8U6F7m00+EnhkUlW3ru6rdyCV0INQzSg1zFLLKmU2aeCQQMEEJXIQORRsTLNyKJhNm3IoaPBg4mQorp2Mh1+00kKN307o/bZrpt5O/FlPU/c75X91/fPd6wPRD1eHyHEL4wAAAABJRU5ErkJggg=='
        let image_down =
        'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6AQMAAAApyY3OAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAIlJREFUKM/F0DEOwyAMBVAjDxk5Qo7CtdiClIv1KJF6gUpZIhXxY2zTDJ2benoS8LFN9MsKbYjxF2XRS1UZ4bCeGFztFmNqphURpidm146kpwFvLDYJpPQtLSLNoySyP2bRpoqih2oSFW8K3lYAxmJGXA88XMnjeuDmih7XA8vXvNeeqX6U6aY6AacbWAQNWOPUAAAAAElFTkSuQmCC'
        let image_left =
        'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6AQMAAAApyY3OAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAHpJREFUKM+1kTEOgCAQBM9Q2JjwA/mJPA2fxlN4giWF8TRBBhMpbKSaZie3i8gPb4Y8FNZKGm8YIAONkNWacIruQLejy+gyug1dQhfRqZa0v6gYA6QfqSWapZnto1B6XdUuFaVHoJunr2MD21nIdJYUEhLYfoGmP777BKKIXC0eYSD5AAAAAElFTkSuQmCC'
        let image_right =
        'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6AQMAAAApyY3OAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAHhJREFUKM+10LERgCAMQFE4CktHcBRWcRMYzVEcwdKCI+od+fGksVCq3/AuiXOfvZnaNXzRClVrEKtMLdSqP2RTRQAFMAFGwAlw7MAk0sAzGnhVoerLKg/F5Pv4NoFNZZNGpk9sxJYeLsDdL5T7S8IFOM/R3OZ+fQeQZV9pMy+bVgAAAABJRU5ErkJggg=='
        let image_up_right =
        'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6CAMAAAAk2e+/AAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAABhlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+X02G5AAAAgXRSTlMAAte32QZhZx7d+TywDTf8/d5VstYPOxULNvKmSY8TFBrxyeGCluJeELQ5uw7ULND4BedlKuv2P/vDA8UgCk30WO41s8+5X8dABAz6QhHVaR156JpPnihSfTJDNOMBm4bzSICqr23NsRjcGRbtjTCS2lzsOmyu9+WLKb2fTL8+RPDhqO4yAAABfElEQVRYw+3WZW/CUBQG4AO0FBsOwwcMm7sLc3d3d3e388/HGGs7lpD0tsm+9P3S5CT3SdPec+8BkCNHzv9FAVAAEABYdQDkA7jo9GNUIDMBzstb5vr0/Gx8Z35zOjI36R2xbu+619eWa2xCoK0FClF5h1cWxDHEwilEOyLlQc8hokoAlMRcESBh7siQlJBWKkijNaHuPrWBED9iYiDQ7Pv1D4Z4/DXyFo2JgeAghQEkEgAvT6IgNo/PIUmgd62oj80mqEIpINoXRkmg2j2UBDIWVXKLTSXEUIOF/xbV5aRQsJvvUOoqMqjZZ+c7FcX8ThYCtTbxHV0fkEGDA73D3Dpzi/6rWEYAdSn579PZ/t3IBJChkef0dLRlHXdkJ6TSmSnmiYPq1LQIiGHX9BvZYinJ7/+R6q1czUG0j9KSOTxDc6UhshZhMIQrS78mncwZtzErrNcYL6V2Zd0tJ6i7QFtAYPcvHv25W6J+/Y3BrRA/x6WGuGN5mpUjhyyfsGtrpKE95HoAAAAASUVORK5CYII='
        let image_down_right =
        'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6CAMAAAAk2e+/AAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAABXFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9jYfXuAAAAc3RSTlMAQ98Ox1j9gAtRNTqBPfgu9p/MTQ+G1Qfx7Y0VBYyJgjkGd3ysU+Zz1IQvMM20PgwBp8Mi4TSUiDvlPxylsaF2WfcjJh0S+wLzQLmY4l/ovX3ra1rPLAOSKa4RUEvgcZwbFHqPzodGbX7qPMvCtsEq1laguT+HEwAAAVlJREFUWMPt1sduwkAQgOGxDfFCIITe0nvvvZHee++992TeX4pJQIC9hPWaQ6T41x6skfY7WGPJAGZm/6qgZjIH4AMgOp2Lq32batTkdW/trPt9+qC70DVmSKS2BXF7A1fX9DDnN2FUSpe8y5hID3SZuJMmrcwmoSFm5vD0BDWSNTnCUmZoD1PZtJCDGfIgRUpBMjPkR4rEAwUtFIkHAkKRuCCaxAdRJE5IK/FCGumWF1JLEW5ILfFD2ST9UBaJA6JLPBCQ57xAJcp5NQbtSgBReJSsH8QI5No8ODo+u397ecL3T35IGhcRA4jig8E9qmjAX2OGnAV5ggrxr0ELOaByVmg6B1TGvEYyTvxcKUaMv/ii7xN/VAZYY2dfSHkkPOYY7Kpf7OmLzLfGPIFGd6izWrRUjdYt9Xfo+ULsLpgRKqGtGyadAEIUmnuhXSAwMAXD5j+omZlZRl+X30CWTm2dHwAAAABJRU5ErkJggg=='
        let image_up_left =
        'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6CAMAAAAk2e+/AAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAABLFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9PVkEkAAAAY3RSTlMAAQ/6Uc0OEAvHTzL7TcudsMHvdwnfUwMcG8UGiIfTrIkg9QI+/ZTDe460km73LNovCo1vQUuR4Lwk45/OK+3UERTkekziZlSK8QQnoOsFaaXmLqOylvPZLYDRZTUWUpiTDfAuEmiSAAABUklEQVRYw+3WZ2+DMBAG4EtTygrQ7NHsJt1777333vv+/38o6gIMSo0dqf3AK1lIZ/mRjPEJgCBBgvxtQr8WqDKbCiWUG1AnYXU7C7UJqKQSR5oKQwqIPphsYW24nEPjJCYXilf9F+G+qeTmThTP5w8X8gK9NLqOGMGPhD8fdXtBkGihlmlsmF5aqK2xg9FmQe3/DupuEhTpoT41z/V1HVHfxWRRo/6ORBfyjILx9mRo+2MDlS3ggF5q4uP9qzmVNjfOA+EDdDLcWA8IW6FJEJPkCbFI3hCDZEFVPsmC7mQuyYJ0iUuyIAG4JDvEJTkgHskJcUgExC6RECmxQ4REDa24ILsU6wL/rfYHskmX9C87Pfi9aA5cUmnRx/kffDmncSCkat7X342KSzOIuesNR1WSl7GU8Xfbbs9Gyoo0TvRp6Tie8d2TOsyx51UMEiQIS94B13oTqqYgGGoAAAAASUVORK5CYII='
        let image_down_left =
        'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6CAMAAAAk2e+/AAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAABg1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8aT76cAAAAgHRSTlMAafwJfflezc+3WA7Z5Rk6PAvpBNE73kJT89QxZ48czNIv9A1DnI3qKQUaymjT4a7HdVuGf85LR20CVHr+tLBlA0GvYSTYZEnbAcazNPX4yB4GrAgnmL6Bcj4qIVKIe8kdVadIEe27B90bOG/3Er1rYJq1wibyh+4Q5CMzRllMXDo5euMAAAGfSURBVFjD7dblUwJBGAbw5aSlBJRGQERBkLC7u7u7u7veP90jDnaEcdhjP+k9X5h9Zu43O7PLe4eQECH/KGsIaUooOEcLK75LpehH628idSrE+nMANfyQ3MY2BRm0C6mM462tUwJAJtVyUB1WmsoSFZEk46D6TBcYS3UKPpCYawxD5VxHImVD/RHIxMQbGintkGQcppkcOkuutQPYfkDfmjck556ZTSydve2YY5UWk0Mww672VPh+XFqCU8tA+whtL+KOpa+bF3Rh8B4ymDNaSnSzG9IPIpsL34/HTPZfS58auMPYuYNMWcQXOsD3U9ZDOkZkkCvqwSIqUI2WfEDmgiQxRANiIp8GKtDLO6/Znw19oOdXhKoROtEUBr1F5Y9f4dt1XygqKgh6YqcHwMQkQBWICr1H6czTgrpoQde0IGnekJEWNEwLMv/GPDDB/M/fDioVeLYA5GqoYt+xNRY4toJkCiBUG7vTEVxJu2Z549RbqXQuba7uVDZWO66mgw6d7kYaEPvvCb+REIp/srGzLP4aa0n8zKFkKUSIkD+Qb9QrYMvxAbaBAAAAAElFTkSuQmCC'

        let motorNames = ['Pan', 'Tilt', 'Slide', 'M4', 'TN Focus', 'TN Iris', 'TN Zoom', 'Roll', 'RS Focus']

        // ########################
        // #### System Presets ####
        // ########################
        presets.VirtUp = {
            category: 'UI Navigation',
            type: 'button',
            name: 'Nav Up',
            style: {
                text: 'Up\\n',
                size: '18',
                color: '16777215',
                bgcolor: combineRgb(0, 0, 0),
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'virtualInput',
                            options: {
                                vbutton: 1,
                            }
                        }
                    ],
                    up: [],
                },
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },
        presets.VirtRight = {
            category: 'UI Navigation',
            type: 'button',
            name: 'Nav Right',
            style: {
                text: 'Right\\n',
                size: '18',
                color: '16777215',
                bgcolor: combineRgb(0, 0, 0),
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'virtualInput',
                            options: {
                                vbutton: 2,
                            }
                        }
                    ],
                    up: [],
                },
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },
        presets.VirtDown = {
            category: 'UI Navigation',
            type: 'button',
            name: 'Nav Down',
            style: {
                text: 'Down\\n',
                size: '18',
                color: '16777215',
                bgcolor: combineRgb(0, 0, 0),
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'virtualInput',
                            options: {
                                vbutton: 3,
                            }
                        }
                    ],
                    up: [],
                },
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },
        presets.VirtLeft = {
            category: 'UI Navigation',
            type: 'button',
            name: 'Nav Left',
            style: {
                text: 'Left\\n',
                size: '18',
                color: '16777215',
                bgcolor: combineRgb(0, 0, 0),
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'virtualInput',
                            options: {
                                vbutton: 4,
                            }
                        }
                    ],
                    up: [],
                },
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },
        presets.VirtEnter = {
            category: 'UI Navigation',
            type: 'button',
            name: 'Nav Enter',
            style: {
                text: 'Select\\n',
                size: '18',
                color: '16777215',
                bgcolor: combineRgb(0, 0, 0),
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'virtualInput',
                            options: {
                                vbutton: 0,
                            }
                        },
                        {
                            // actionId: 'virtualInput',
                            // delay: 2000,
                            // options: {
                            //     vbutton: 6,
                            // }
                        },
                    ],
                    up: [
                        //Abort Delayed Actions Here
                    ],
                    2000: { //Duration Group Example
                        options: {
                            runWhileHeld: true,
                        },
                        actions: [
                            {
                                actionId: 'virtualInput',
                                options: {
                                    vbutton: 6,
                                },
                                delay: 0,
                            },
                        ],
                    },
                },
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },
        presets.VirtBack = {
            category: 'UI Navigation',
            type: 'button',
            name: 'Nav Back',
            style: {
                text: 'Escape\\n',
                size: '18',
                color: '16777215',
                bgcolor: combineRgb(0, 0, 0),
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'virtualInput',
                            options: {
                                vbutton: 5,
                            }
                        }
                    ],
                    up: [],
                },
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },

            

            
// ########################
        // ####  Smart Motor   ####
        // ########################
        presets.MotorHeader1 = {
            category: 'Motors',
            name: 'Streamdeck Motor Page',
            type: 'text',
            text: 'This is an Example Motor Setup Page for Streamdeck'
        },
        presets.CurMotPos = {
            category: 'Motors',
            type: 'button',
            name: 'Current Motor Pos',
            style: {
                text: '$(companion-module-emotimo-st4-3:CurrentMtrPosStr)\\n',
                size: '18',
                color: '16777215',
                bgcolor: combineRgb(0, 0, 0),
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'jogMotorSmarter',
                            options: {
                                direction: 1,
                            }
                        }
                    ],
                    up: [
                        {
                            actionId: 'stopCurrentMotor',
                        }
                    ],
                },
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },
        presets.CurMotNeg = {
            category: 'Motors',
            type: 'button',
            name: 'Current Motor Neg',
            style: {
                text: '$(companion-module-emotimo-st4-3:CurrentMtrNegStr)\\n',
                size: '18',
                color: '16777215',
                bgcolor: combineRgb(0, 0, 0),
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'jogMotorSmarter',
                            options: {
                                direction: -1,
                            }
                        }
                    ],
                    up: [
                        {
                            actionId: 'stopCurrentMotor',
                        }
                    ],
                },
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },
        presets.curMtrAxisInversion = {
            category: 'Motors',
            type: 'button',
            name: 'Current Motor Inversion',
            style: {
                text: 'Direction:\\n$(companion-module-emotimo-st4-3:CurrentMtrInversion)',
                size: '14',
                color: '16777215',
                bgcolor: combineRgb(0, 0, 0),
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'invertCurrentAxis',
                        }
                    ],
                    up: [

                    ],
                },
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        }
        presets.curMotorSpeedInc = {
            category: 'Motors',
            type: 'button',
            name: 'Current Motor Increment',
            style: {
                text: '⬆️',
                color: '16777215',
                bgcolor: combineRgb(0, 0, 100),
                // show_topbar: 0          //Hides the Top Bar
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'setJogSpeedLimitSmart',
                            options: {
                                direction: 1
                            }
                        }
                    ],
                    up: [
                    ]
                }
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },
        presets.MotorLineBreak1 = {
            category: 'Motors',
            name: '',
            type: 'text',
            text: ''
        },

        
        presets.IncreaseMtrSetup = {
            category: 'Motors',
            type: 'button',
            name: 'Increase Motor ID',
            style: {
                text: '⬆️',
                color: '16777215',
                bgcolor: combineRgb(50, 50, 0),
                // show_topbar: 0          //Hides the Top Bar
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'setMotorID',
                            options: {
                                direction: 1
                            }
                        }
                    ],
                    up: [
                    ]
                }
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },
        presets.curMtrSetup = {
            category: 'Motors',
            type: 'button',
            name: 'Selected Motor',
            style: {
                text: 'Motor\\nID:\\n$(companion-module-emotimo-st4-3:CurrentMtrSet)',
                size: 'auto',
                color: '16777215',
                bgcolor: combineRgb(0, 0, 0),
            },
            steps: [
                {
                    down: [
                        
                    ],
                    up: [

                    ],
                },
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },
        presets.DecreaseMtrSetup = {
            category: 'Motors',
            type: 'button',
            name: 'Decrease Motor ID',
            style: {
                text: '⬇️',
                color: '16777215',
                bgcolor: combineRgb(50, 50, 0),
                // show_topbar: 0          //Hides the Top Bar
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'setMotorID',
                            options: {
                                direction: -1
                            }
                        }
                    ],
                    up: [
                    ]
                }
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },
        presets.curMtrSpeedLimit = {
            category: 'Motors',
            type: 'button',
            name: 'Current Motor Speed',
            style: {
                text: 'Speed:\\n$(companion-module-emotimo-st4-3:CurrentMtrSpeed)',
                size: 'auto',
                color: '16777215',
                bgcolor: combineRgb(0, 0, 0),
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'resetJogSpeedLimitSmart',
                        }
                    ],
                    up: [

                    ],
                },
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },
        presets.MotorLineBreak2 = {
            category: 'Motors',
            name: '',
            type: 'text',
            text: ''
        },
        
        presets.SetCurMtrStopA = {
            category: 'Motors',
            type: 'button',
            name: 'Current Motor Stop A',
            style: {
                text: '$(companion-module-emotimo-st4-3:CurrentMtrStr) Stop A',
                color: '16777215',
                bgcolor: combineRgb(127, 0, 0),
                // show_topbar: 0          //Hides the Top Bar
            },
            steps: [
                {
                    down: [
                       
                    ],
                    up: [
                        {
                            actionId: 'setStopASmart',   
                        }
                    ],
                    2000: {
                        options: {
                            runWhileHeld: true,
                        },
                        actions: [
                            {
                                actionId: 'recallStopA',
                                options: {
                                    id_mot: 0
                                },
                                delay: 0,
                            },
                        ],
                    },
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'StopAStatusSmart',
                    style: {
                        bgcolor: combineRgb(0, 127, 0),
                        color: combineRgb(0, 0, 0),
                    },
                }
            ]
        },
        presets.clearStopsByCurAxis = {
            category: 'Motors',
            type: 'button',
            name: 'Clear Current Motor Stops',
            style: {
                text: 'Clear $(companion-module-emotimo-st4-3:CurrentMtrStr) Stops',
                color: '16777215',
                bgcolor: combineRgb(0, 0, 0),
                // show_topbar: 0          //Hides the Top Bar
            },
            steps: [
                {
                    down: [
                       
                    ],
                    up: [
                        
                    ],
                    2000: {
                        options: {
                            runWhileHeld: true,
                        },
                        actions: [
                            {
                                actionId: 'clearStopByAxisSmart',
                                delay: 0,
                            },
                        ],
                    },
                }
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },
        presets.SetCurMtrStopB = {
            category: 'Motors',
            type: 'button',
            name: 'Current Motor Stop B',
            style: {
                text: '$(companion-module-emotimo-st4-3:CurrentMtrStr) Stop B',
                color: '16777215',
                bgcolor: combineRgb(127, 0, 0),
                // show_topbar: 0          //Hides the Top Bar
            },
            steps: [
                {
                    down: [
                       
                    ],
                    up: [
                        {
                            actionId: 'setStopBSmart',
                        }
                    ],
                    2000: {
                        options: {
                            runWhileHeld: true,
                        },
                        actions: [
                            {
                                actionId: 'recallStopB',
                                options: {
                                    id_mot: 0
                                },
                                delay: 0,
                            },
                        ],
                    },
                }
            ],
            feedbacks: [
                {
                    feedbackId: 'StopBStatusSmart',              
                    style: {
                        bgcolor: combineRgb(0, 127, 0),
                        color: combineRgb(0, 0, 0),
                    },
                }
            ]
        },
        presets.curMotorSpeedDec = {
            category: 'Motors',
            type: 'button',
            name: 'Current Motor Decrement',
            style: {
                text: '⬇️',
                color: '16777215',
                bgcolor: combineRgb(0, 0, 100),
                // show_topbar: 0          //Hides the Top Bar
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'setJogSpeedLimitSmart',
                            options: {
                                direction: -1
                            }
                        }
                    ],
                    up: [
                    ]
                }
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        }
        
        presets.MotorHeader2 = {
            category: 'Motors',
            name: 'Rotary Encoders',
            type: 'text',
            text: 'These are only available for Surfaces that support Rotary Encoders (Ex. Streamdeck+)'
        },
        
        
        presets.MotorIDRotary2 = {
            category: 'Motors',
            type: 'button',
            name: 'Motor ID',
            options: { rotaryActions: true },
            style: {
                text: 'Motor ID Rotary',
                size: 'auto',
                color: '16777215',
                bgcolor: combineRgb(50, 50, 0),
            },
            steps: [
                {
                    rotate_left: [
                        {
                            actionId: 'setMotorID',
                            options: {
                                direction: -1
                            }
                        }
                    ],
                    rotate_right: [
                        {
                            actionId: 'setMotorID',
                            options: {
                                direction: 1
                            }
                        }
                    ],
                    down: [
                       
                    ],
                    up: [

                    ],
                },
            ],
        },
        presets.MotorSpeedRotary2 = {
            category: 'Motors',
            type: 'button',
            name: 'Motor Speed Rotary',
            options: { rotaryActions: true },
            style: {
                text: 'Motor Speed Rotary',
                size: 'auto',
                color: '16777215',
                bgcolor: combineRgb(0, 0, 100),
            },
            steps: [
                {
                    rotate_left: [
                        {
                            actionId: 'setJogSpeedLimitSmart',
                            options: {
                                direction: -1
                            }
                        }
                    ],
                    rotate_right: [
                        {
                            actionId: 'setJogSpeedLimitSmart',
                            options: {
                                direction: 1
                            }
                        }
                    ],
                    down: [
                        {
                            actionId: 'resetJogSpeedLimitSmart'
                        }
                    ],
                    up: [

                    ],
                },
            ],
        },

        presets.MotorHeader3 = {
            category: 'Motors',
            name: 'Motor Arrows',
            type: 'text',
            text: 'These are Pan/Tilt Velocity Controls with Arrow Images'
        },
        // ########################
            // # Motor Arrow Presets ##
            // ########################
            presets.MotLeftUp = {
                category: 'Motors',
                type: 'button',
                name: 'PanLeft TiltUp',
                style: {
                    text: '',
                    png64: image_up_left,
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 1,
                        //             id_speed: 50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 1,
                                    direction: -1,
                                }
                            },
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 2,
                                    direction: 1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 1,
                                    id_speed: 0,
                                }
                            },
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 2,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.MotTiltUp = {
                category: 'Motors',
                type: 'button',
                name: 'Tilt Up',
                style: {
                    text: '',
                    png64: image_up,
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(204, 0, 204),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 2,
                        //             id_speed: 50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 2,
                                    direction: 1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 2,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.MotRightUp = {
                category: 'Motors',
                type: 'button',
                name: 'PanRight TiltUp',
                style: {
                    text: '',
                    png64: image_up_right,
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 1,
                        //             id_speed: 50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 1,
                                    direction: 1,
                                }
                            },
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 2,
                                    direction: 1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 1,
                                    id_speed: 0,
                                }
                            },
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 2,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.MotorLineBreak3 = {
                category: 'Motors',
                name: '',
                type: 'text',
                text: ''
            },
            
            presets.MotPanLeft = {
                category: 'Motors',
                type: 'button',
                name: 'Pan Left',
                style: {
                    text: '',
                    png64: image_left,
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 1,
                        //             id_speed: 50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 1,
                                    direction: -1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 1,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.StopMotors = {
                category: 'Motors',
                type: 'button',
                name: 'Stop All Motors',
                style: {
                    text: 'E-Stop\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'stopMotors',
                            }
                        ],
                        up: [
                            {
                                actionId: 'stopMotors',
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.MotPanRight = {
                category: 'Motors',
                type: 'button',
                name: 'Pan Right',
                style: {
                    text: '',
                    png64: image_right,
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 1,
                        //             id_speed: -50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 1,
                                    direction: 1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 1,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.MotorLineBreak4 = {
                category: 'Motors',
                name: '',
                type: 'text',
                text: ''
            },
            
            presets.MotLeftDown = {
                category: 'Motors',
                type: 'button',
                name: 'PanLeft TiltDown',
                style: {
                    text: '',
                    png64: image_down_left,
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 1,
                        //             id_speed: 50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 1,
                                    direction: -1,
                                }
                            },
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 2,
                                    direction: -1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 1,
                                    id_speed: 0,
                                }
                            },
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 2,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.MotTiltDown = {
                category: 'Motors',
                type: 'button',
                name: 'Tilt Down',
                style: {
                    text: '',
                    png64: image_down,
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 2,
                        //             id_speed: -50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 2,
                                    direction: -1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 2,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },       
            presets.MotRightDown = {
                category: 'Motors',
                type: 'button',
                name: 'PanRight TiltDown',
                style: {
                    text: '',
                    png64: image_down_right,
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 1,
                        //             id_speed: 50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 1,
                                    direction: 1,
                                }
                            },
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 2,
                                    direction: -1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 1,
                                    id_speed: 0,
                                }
                            },
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 2,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            
            
            presets.MotorHeader4 = {
                category: 'Motors',
                name: 'Position Control',
                type: 'text',
                text: 'These are Rotary Encoder Commands that give you Position Control of the Specified Axis.\nThese are only available for Surfaces that support Rotary Encoders (Ex. Streamdeck+)'
            },
            presets.FocusPositionControl = {
                category: 'Motors',
                type: 'button',
                name: 'Focus Position Control',
                options: { rotaryActions: true },
                style: {
                    text: 'Focus Pos. Rotary',
                    size: 'auto',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 50),
                },
                steps: [
                    {
                        rotate_left: [
                            {
                                actionId: 'positionDrive',
                                options: {
                                    id_mot: 5,
                                    direction: -1
                                }
                            }
                        ],
                        rotate_right: [
                            {
                                actionId: 'positionDrive',
                                options: {
                                    id_mot: 5,
                                    direction: 1
                                }
                            }
                        ],
                        down: [
                            {
                                actionId: 'toggleIncrement',
                                options: {
                                    id_mot: 5
                                }
                            }
                        ],
                        up: [
    
                        ],
                    },
                ],
            },
            presets.IrisPositionControl = {
                category: 'Motors',
                type: 'button',
                name: 'Iris Position Control',
                options: { rotaryActions: true },
                style: {
                    text: 'Iris Pos. Rotary',
                    size: 'auto',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 50),
                },
                steps: [
                    {
                        rotate_left: [
                            {
                                actionId: 'positionDrive',
                                options: {
                                    id_mot: 6,
                                    direction: -1
                                }
                            }
                        ],
                        rotate_right: [
                            {
                                actionId: 'positionDrive',
                                options: {
                                    id_mot: 6,
                                    direction: 1
                                }
                            }
                        ],
                        down: [
                            {
                                actionId: 'toggleIncrement',
                                options: {
                                    id_mot: 6
                                }
                            }
                        ],
                        up: [
    
                        ],
                    },
                ],
            },
            presets.ZoomPositionControl = {
                category: 'Motors',
                type: 'button',
                name: 'Zoom Position Control',
                options: { rotaryActions: true },
                style: {
                    text: 'Zoom Pos. Rotary',
                    size: 'auto',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 50),
                },
                steps: [
                    {
                        rotate_left: [
                            {
                                actionId: 'positionDrive',
                                options: {
                                    id_mot: 7,
                                    direction: -1
                                }
                            }
                        ],
                        rotate_right: [
                            {
                                actionId: 'positionDrive',
                                options: {
                                    id_mot: 7,
                                    direction: 1
                                }
                            }
                        ],
                        down: [
                            {
                                actionId: 'toggleIncrement',
                                options: {
                                    id_mot: 7
                                }
                            }
                        ],
                        up: [
    
                        ],
                    },
                ],
            },
            presets.PanPositionControl = {
                category: 'Motors',
                type: 'button',
                name: 'Pan Position Control',
                options: { rotaryActions: true },
                style: {
                    text: 'Pan Pos. Rotary',
                    size: 'auto',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 50),
                },
                steps: [
                    {
                        rotate_left: [
                            {
                                actionId: 'positionDrive',
                                options: {
                                    id_mot: 1,
                                    direction: -1
                                }
                            }
                        ],
                        rotate_right: [
                            {
                                actionId: 'positionDrive',
                                options: {
                                    id_mot: 1,
                                    direction: 1
                                }
                            }
                        ],
                        down: [
                            {
                                actionId: 'toggleIncrement',
                                options: {
                                    id_mot: 1
                                }
                            }
                        ],
                        up: [
    
                        ],
                    },
                ],
            },
            presets.TiltPositionControl = {
                category: 'Motors',
                type: 'button',
                name: 'Tilt Position Control',
                options: { rotaryActions: true },
                style: {
                    text: 'Tilt Pos. Rotary',
                    size: 'auto',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 50),
                },
                steps: [
                    {
                        rotate_left: [
                            {
                                actionId: 'positionDrive',
                                options: {
                                    id_mot: 2,
                                    direction: -1
                                }
                            }
                        ],
                        rotate_right: [
                            {
                                actionId: 'positionDrive',
                                options: {
                                    id_mot: 2,
                                    direction: 1
                                }
                            }
                        ],
                        down: [
                            {
                                actionId: 'toggleIncrement',
                                options: {
                                    id_mot: 2
                                }
                            }
                        ],
                        up: [
    
                        ],
                    },
                ],
            },
            presets.SlidePositionControl = {
                category: 'Motors',
                type: 'button',
                name: 'Slide Position Control',
                options: { rotaryActions: true },
                style: {
                    text: 'Slide Pos. Rotary',
                    size: 'auto',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 50),
                },
                steps: [
                    {
                        rotate_left: [
                            {
                                actionId: 'positionDrive',
                                options: {
                                    id_mot: 3,
                                    direction: -1
                                }
                            }
                        ],
                        rotate_right: [
                            {
                                actionId: 'positionDrive',
                                options: {
                                    id_mot: 3,
                                    direction: 1
                                }
                            }
                        ],
                        down: [
                            {
                                actionId: 'toggleIncrement',
                                options: {
                                    id_mot: 3
                                }
                            }
                        ],
                        up: [
    
                        ],
                    },
                ],
            },
            presets.M4PositionControl = {
                category: 'Motors',
                type: 'button',
                name: 'M4 Position Control',
                options: { rotaryActions: true },
                style: {
                    text: 'M4 Pos. Rotary',
                    size: 'auto',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 50),
                },
                steps: [
                    {
                        rotate_left: [
                            {
                                actionId: 'positionDrive',
                                options: {
                                    id_mot: 4,
                                    direction: -1
                                }
                            }
                        ],
                        rotate_right: [
                            {
                                actionId: 'positionDrive',
                                options: {
                                    id_mot: 4,
                                    direction: 1
                                }
                            }
                        ],
                        down: [
                            {
                                actionId: 'toggleIncrement',
                                options: {
                                    id_mot: 4
                                }
                            }
                        ],
                        up: [
    
                        ],
                    },
                ],
            },
            presets.RollPositionControl = {
                category: 'Motors',
                type: 'button',
                name: 'Roll Position Control',
                options: { rotaryActions: true },
                style: {
                    text: 'Roll Pos. Rotary',
                    size: 'auto',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 50),
                },
                steps: [
                    {
                        rotate_left: [
                            {
                                actionId: 'positionDrive',
                                options: {
                                    id_mot: 8,
                                    direction: -1
                                }
                            }
                        ],
                        rotate_right: [
                            {
                                actionId: 'positionDrive',
                                options: {
                                    id_mot: 8,
                                    direction: 1
                                }
                            }
                        ],
                        down: [
                            {
                                actionId: 'toggleIncrement',
                                options: {
                                    id_mot: 8
                                }
                            }
                        ],
                        up: [
    
                        ],
                    },
                ],
            },

            presets.MotorHeader8 = {
                category: 'Motors',
                name: 'Velocity Control',
                type: 'text',
                text: 'These can be used to set a cruise control Speed. The motor will not stop until it reaches a Virtual Limit or the cruise speed is cleared. These are only available for Surfaces that support Rotary Encoders (Ex. Streamdeck+)'
            }
            for (let inc = 1; inc < 10; inc++) {
                presets[motorNames[inc-1] + 'CruiseSpeed'] = {
                    category: 'Motors',
                    type: 'button',
                    name: motorNames[inc-1] + ' Velocity Control',
                    options: { rotaryActions: true },
                    style: {
                        text: motorNames[inc-1] + ' Vel. Rotary',
                        size: 'auto',
                        color: '16777215',
                        bgcolor: combineRgb(0, 0, 50),
                    },
                    steps: [
                        {
                            rotate_left: [
                                {
                                    actionId: 'setCruiseSpeed',
                                    options: {
                                        id_mot: inc,
                                        direction: -1
                                    }
                                }
                            ],
                            rotate_right: [
                                {
                                    actionId: 'setCruiseSpeed',
                                    options: {
                                        id_mot: inc,
                                        direction: 1
                                    }
                                }
                            ],
                            down: [
                                {
                                    actionId: 'resetCruiseSpeed',
                                    options: {
                                        id_mot: inc
                                    }
                                }
                            ],
                            up: [
    
                            ],
                        },
                    ],
                }
            }
            
            presets.MotorHeader5 = {
                category: 'Motors',
                name: 'Axis Speed Limit',
                type: 'text',
                text: 'This is a multiplier ranging from 0-100% that throttles the max speed of the axis'
            }
        for (let inc = 1; inc < 9; inc++) {
            presets['motorSpeedInc' + inc] = {
                category: 'Motors',
                type: 'button',
                name: motorNames[inc-1] + ' Increment',
                style: {
                    text: '⬆️',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 100),
                    // show_topbar: 0          //Hides the Top Bar
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'setJogSpeedLimit',
                                options: {
                                    id_mot: inc,
                                    direction: 1
                                }
                            }
                        ],
                        up: [
                        ]
                    }
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            }
        }
        presets.MotorLineBreak5 = {
            category: 'Motors',
            name: '',
            type: 'text',
            text: ''
        },

            // ########################
            // #### Motor  Speeds  ####
            // ########################
            presets.panSpeedLimit = {
                category: 'Motors',
                type: 'button',
                name: 'Pan Speed',
                style: {
                    text: 'Pan\\nSpeed:\\n$(companion-module-emotimo-st4-3:PanSpeedLimit)',
                    size: 'auto',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'resetJogSpeedLimit',
                                options: {
                                    id_mot: 1
                                }
                            }
                        ],
                        up: [

                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.tiltSpeedLimit = {
                category: 'Motors',
                type: 'button',
                name: 'Tilt Speed',
                style: {
                    text: 'Tilt\\nSpeed:\\n$(companion-module-emotimo-st4-3:TiltSpeedLimit)',
                    size: 'auto',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'resetJogSpeedLimit',
                                options: {
                                    id_mot: 2
                                }
                            }
                        ],
                        up: [

                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.m3SpeedLimit = {
                category: 'Motors',
                type: 'button',
                name: 'M3 Speed',
                style: {
                    text: 'Slide\\nSpeed:\\n$(companion-module-emotimo-st4-3:M3SpeedLimit)',
                    size: 'auto',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'resetJogSpeedLimit',
                                options: {
                                    id_mot: 3
                                }
                            }
                        ],
                        up: [

                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.m4SpeedLimit = {
                category: 'Motors',
                type: 'button',
                name: 'M4 Speed',
                style: {
                    text: 'M4\\nSpeed:\\n$(companion-module-emotimo-st4-3:M4SpeedLimit)',
                    size: 'auto',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'resetJogSpeedLimit',
                                options: {
                                    id_mot: 4
                                }
                            }
                        ],
                        up: [

                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.focusSpeedLimit = {
                category: 'Motors',
                type: 'button',
                name: 'Focus Speed',
                style: {
                    text: 'Focus\\nSpeed:\\n$(companion-module-emotimo-st4-3:TN1SpeedLimit)',
                    size: 'auto',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'resetJogSpeedLimit',
                                options: {
                                    id_mot: 5
                                }
                            }
                        ],
                        up: [

                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.irisSpeedLimit = {
                category: 'Motors',
                type: 'button',
                name: 'Iris Speed',
                style: {
                    text: 'Iris\\nSpeed:\\n$(companion-module-emotimo-st4-3:TN2SpeedLimit)',
                    size: 'auto',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'resetJogSpeedLimit',
                                options: {
                                    id_mot: 6
                                }
                            }
                        ],
                        up: [

                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.zoomSpeedLimit = {
                category: 'Motors',
                type: 'button',
                name: 'Zoom Speed',
                style: {
                    text: 'Zoom\\nSpeed:\\n$(companion-module-emotimo-st4-3:TN3SpeedLimit)',
                    size: 'auto',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'resetJogSpeedLimit',
                                options: {
                                    id_mot: 7
                                }
                            }
                        ],
                        up: [

                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.rollSpeedLimit = {
                category: 'Motors',
                type: 'button',
                name: 'Roll Speed',
                style: {
                    text: 'Roll\\nSpeed:\\n$(companion-module-emotimo-st4-3:RollSpeedLimit)',
                    size: 'auto',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'resetJogSpeedLimit',
                                options: {
                                    id_mot: 8
                                }
                            }
                        ],
                        up: [

                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            }
            presets.MotorLineBreak6 = {
                category: 'Motors',
                name: '',
                type: 'text',
                text: ''
            }

        for (let inc = 1; inc < 9; inc++) {    
                presets['motorSpeedDec' + inc] = {
                    category: 'Motors',
                    type: 'button',
                    name: motorNames[inc-1] + ' Decrement',
                    style: {
                        text: '⬇️',
                        color: '16777215',
                        bgcolor: combineRgb(0, 0, 100),
                        // show_topbar: 0          //Hides the Top Bar
                    },
                    steps: [
                        {
                            down: [
                                {
                                    actionId: 'setJogSpeedLimit',
                                    options: {
                                        id_mot: inc,
                                        direction: -1
                                    }
                                }
                            ],
                            up: [
                            ]
                        }
                    ],
                    feedbacks: [
                        {
                            style: {
                                color: foregroundColor,
                                bgcolor: backgroundColorRed,
                            }
                        }
                    ]
                }
        }

        // ########################
            // #### Motor  Presets ####
            // ########################
            presets.MotorHeader6 = {
                category: 'Motors',
                name: 'Jog Motors by Axis',
                type: 'text',
                text: 'These buttons can be used for Live Velocity Control of the Specified Axis'
            }
            presets.MotPanNeg = {
                category: 'Motors',
                type: 'button',
                name: 'Pan Left',
                style: {
                    text: 'Pan Left\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 1,
                        //             id_speed: -50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 1,
                                    direction: -1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 1,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.MotPanPos = {
                category: 'Motors',
                type: 'button',
                name: 'Pan Right',
                style: {
                    text: 'Pan Right\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 1,
                        //             id_speed: 50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 1,
                                    direction: 1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 1,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },

            presets.MotTiltNeg = {
                category: 'Motors',
                type: 'button',
                name: 'Tilt Down',
                style: {
                    text: 'Tilt Down\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 2,
                        //             id_speed: -50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 2,
                                    direction: -1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 2,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.MotTiltPos = {
                category: 'Motors',
                type: 'button',
                name: 'Tilt Up',
                style: {
                    text: 'Tilt Up\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 2,
                        //             id_speed: 50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 2,
                                    direction: 1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 2,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },

            presets.MotSlideNeg = {
                category: 'Motors',
                type: 'button',
                name: 'Slide Neg',
                style: {
                    text: 'Slide Neg\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 3,
                        //             id_speed: -50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 3,
                                    direction: -1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 3,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.MotSlidePos = {
                category: 'Motors',
                type: 'button',
                name: 'Slide Pos',
                style: {
                    text: 'Slide Pos\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 3,
                        //             id_speed: 50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 3,
                                    direction: 1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 3,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },

            presets.MotTurnTableNeg = {
                category: 'Motors',
                type: 'button',
                name: 'TurnTable Neg',
                style: {
                    text: 'TT Neg\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 4,
                        //             id_speed: -50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 4,
                                    direction: -1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 4,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.MotTurnTablePos = {
                category: 'Motors',
                type: 'button',
                name: 'TurnTable Pos',
                style: {
                    text: 'TT Pos\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 4,
                        //             id_speed: 50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 4,
                                    direction: 1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 4,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },

            presets.MotFocusNeg = {
                category: 'Motors',
                type: 'button',
                name: 'Focus Neg',
                style: {
                    text: 'Focus Neg\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 5,
                        //             id_speed: -50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 5,
                                    direction: -1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 5,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.MotFocusPos = {
                category: 'Motors',
                type: 'button',
                name: 'Focus Pos',
                style: {
                    text: 'Focus Pos\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 5,
                        //             id_speed: 50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 5,
                                    direction: 1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 5,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },

            presets.MotIrisNeg = {
                category: 'Motors',
                type: 'button',
                name: 'Iris Neg',
                style: {
                    text: 'Iris Neg\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 6,
                        //             id_speed: -50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 6,
                                    direction: -1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 6,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.MotIrisPos = {
                category: 'Motors',
                type: 'button',
                name: 'Iris Pos',
                style: {
                    text: 'Iris Pos\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 6,
                        //             id_speed: 50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 6,
                                    direction: 1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 6,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },

            presets.MotZoomNeg = {
                category: 'Motors',
                type: 'button',
                name: 'Zoom Neg',
                style: {
                    text: 'Zoom Neg\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 7,
                        //             id_speed: -50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 7,
                                    direction: -1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 7,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.MotZoomPos = {
                category: 'Motors',
                type: 'button',
                name: 'Zoom Pos',
                style: {
                    text: 'Zoom Pos\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 7,
                        //             id_speed: 50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 7,
                                    direction: 1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 7,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },

            presets.MotRollNeg = {
                category: 'Motors',
                type: 'button',
                name: 'Roll Neg',
                style: {
                    text: 'Roll Neg\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 8,
                        //             id_speed: -50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 8,
                                    direction: -1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 8,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.MotRollPos = {
                category: 'Motors',
                type: 'button',
                name: 'Roll Pos',
                style: {
                    text: 'Roll Pos\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 8,
                        //             id_speed: 50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 8,
                                    direction: 1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 8,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },

            presets.MotRSFocusNeg = {
                category: 'Motors',
                type: 'button',
                name: 'RSFocus Neg',
                style: {
                    text: 'RSFocus Neg\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 9,
                        //             id_speed: -50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 9,
                                    direction: -1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 9,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets.MotRSFocusPos = {
                category: 'Motors',
                type: 'button',
                name: 'RSFocus Pos',
                style: {
                    text: 'RSFocus Pos\\n',
                    size: '18',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        // down: [
                        //     {
                        //         actionId: 'jogMotor',
                        //         options: {
                        //             id_mot: 9,
                        //             id_speed: 50000,
                        //         }
                        //     }
                        // ],
                        down: [
                            {
                                actionId: 'jogMotorSmart',
                                options: {
                                    id_mot: 9,
                                    direction: 1,
                                }
                            }
                        ],
                        up: [
                            {
                                actionId: 'jogMotor',
                                options: {
                                    id_mot: 9,
                                    id_speed: 0,
                                }
                            }
                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            }
            

        // presets.motorSpeed = {
        //     category: 'Temp',
        //     type: 'button',
        //     name: 'Increment Speed',
        //     style: {
        //         text: 'Test',
        //         size: 44,
        //         color: '16777215',
        //         bgcolor: combineRgb(0, 0, 0),
        //     },
        //     steps: [
        //         {
        //             down: [
        //                 {
        //                     actionId: 'setJogSpeedLimit',
        //                     options: {
        //                         id_mot: 1,
        //                         direction: 1
        //                     }
        //                 }
        //             ],
        //             up: [
        //             ]
        //         },
        //     ],
        //     feedbacks: [
        //         {
        //             style: {
        //                 color: foregroundColor,
        //                 bgcolor: backgroundColorRed,
        //             }
        //         }
        //     ]
        // }

        // ########################
        // ####  Motor  Stops  ####
        // ########################
        presets.MotorHeader7 = {
            category: 'Motors',
            name: 'Stops by Axis',
            type: 'text',
            text: 'These buttons can be used to Set/Clear the Virtual Limits for the Specified Axis'
        }
        for (let inc = 1; inc < 9; inc++) {
            presets['setStopA' + inc] = {
                category: 'Motors',
                type: 'button',
                name: motorNames[inc-1] + ' Stop A',
                style: {
                    text: motorNames[inc-1] + ' Stop A',
                    color: '16777215',
                    bgcolor: combineRgb(127, 0, 0),
                    // show_topbar: 0          //Hides the Top Bar
                },
                steps: [
                    {
                        down: [
                           
                        ],
                        up: [
                            {
                                actionId: 'setStopA',
                                options: {
                                    id_mot: inc,
                                }
                            }
                        ],
                        2000: {
                            options: {
                                runWhileHeld: true,
                            },
                            actions: [
                                {
                                    actionId: 'recallStopA',
                                    options: {
                                        id_mot: inc,
                                    },
                                    delay: 0,
                                },
                            ],
                        },
                    }
                ],
                feedbacks: [
                    {
                        feedbackId: 'StopAStatus',
                        options: {
                            id_mot: inc,
                        },
                        style: {
                            bgcolor: combineRgb(0, 127, 0),
                            color: combineRgb(0, 0, 0),
                        },
                    }
                ]
            },
            presets['setStopB' + inc] = {
                category: 'Motors',
                type: 'button',
                name: motorNames[inc-1] + ' Stop B',
                style: {
                    text: motorNames[inc-1] + ' Stop B',
                    color: '16777215',
                    bgcolor: combineRgb(127, 0, 0),
                    // show_topbar: 0          //Hides the Top Bar
                },
                steps: [
                    {
                        down: [
                           
                        ],
                        up: [
                            {
                                actionId: 'setStopB',
                                options: {
                                    id_mot: inc,
                                }
                            }
                        ],
                        2000: {
                            options: {
                                runWhileHeld: true,
                            },
                            actions: [
                                {
                                    actionId: 'recallStopB',
                                    options: {
                                        id_mot: inc,
                                    },
                                    delay: 0,
                                },
                            ],
                        },
                    }
                ],
                feedbacks: [
                    {
                        feedbackId: 'StopBStatus',
                        options: {
                            id_mot: inc,
                        },
                        style: {
                            bgcolor: combineRgb(0, 127, 0),
                            color: combineRgb(0, 0, 0),
                        },
                    }
                ]
            },
            presets['clearStops' + inc] = {
                category: 'Motors',
                type: 'button',
                name: 'Clear ' + motorNames[inc-1] + ' Stops',
                style: {
                    text: 'Clear ' + motorNames[inc-1] + ' Stops',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                    // show_topbar: 0          //Hides the Top Bar
                },
                steps: [
                    {
                        down: [
                           
                        ],
                        up: [
                            
                        ],
                        2000: {
                            options: {
                                runWhileHeld: true,
                            },
                            actions: [
                                {
                                    actionId: 'clearStopByAxis',
                                    options: {
                                        id_mot: inc,
                                    },
                                    delay: 0,
                                },
                            ],
                        },
                    }
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            }
        }

        presets.clearAllStops = {
            category: 'Motors',
            type: 'button',
            name: 'Clear All Stops',
            style: {
                text: 'Clear All Stops',
                color: '16777215',
                bgcolor: combineRgb(0, 0, 0),
                // show_topbar: 0          //Hides the Top Bar
            },
            steps: [
                {
                    down: [

                    ],
                    up: [

                    ],
                    2000: {
                        options: {
                            runWhileHeld: true,
                        },
                        actions: [
                            {
                                actionId: 'clearAllStops',
                                delay: 0,
                            },
                        ],
                    },
                }
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },

        
        
       
        

        // ########################
        // #### Go To  Presets ####
        // ########################

        // for (let save = 0; save < 30; save++) {
        //     presets['savePreset' + save] = {
        //         category: 'Save Preset',
        //         type: 'button',
        //         name: 'Save Preset ' + save,
        //         style: {
        //             text: 'Save\\nPSET\\n' + save,
        //             size: '14',
        //             color: '16777215',
        //             bgcolor: combineRgb(0, 0, 0),
        //         },
        //         steps: [
        //             {
        //                 down: [
        //                     {
        //                         actionId: 'savePset',
        //                         options: {
        //                             num: save
        //                         }
        //                     }
        //                 ],
        //                 up: []
        //             },
        //         ],
        //         feedbacks: [
        //             {
        //                 style: {
        //                     color: foregroundColor,
        //                     bgcolor: backgroundColorRed,
        //                 }
        //             }
        //         ]
        //     }
        // }

        presets.PresetHeader1 = {
            category: 'Presets',
            name: 'Smart Presets',
            type: 'text',
            text: 'These buttons use the Current Preset ID to Setup and Recall Presets'
        },
        presets.IncreasePstSetup = {
            category: 'Presets',
            type: 'button',
            name: 'Increase Preset ID',
            style: {
                text: '⬆️',
                color: '16777215',
                bgcolor: combineRgb(50, 50, 0),
                // show_topbar: 0          //Hides the Top Bar
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'setPresetID',
                            options: {
                                direction: 1
                            }
                        }
                    ],
                    up: [
                    ]
                }
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },
        presets.smartIncreaseRun = {
            category: 'Presets',
            type: 'button',
            name: 'Increase RunTime',
            style: {
                text: '⬆️',
                color: '16777215',
                bgcolor: combineRgb(0, 50, 100),
                // show_topbar: 0          //Hides the Top Bar
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'setPresetRunTimeSmart',
                            options: {
                                direction: 1
                            }
                        }
                    ],
                    up: [
                    ]
                }
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },
        presets.smartIncreaseRamp = {
            category: 'Presets',
            type: 'button',
            name: 'Increase RampTime',
            style: {
                text: '⬆️',
                color: '16777215',
                bgcolor: combineRgb(50, 0, 100),
                // show_topbar: 0          //Hides the Top Bar
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'setPresetRampTimeSmart',
                            options: {
                                direction: 1
                            }
                        }
                    ],
                    up: [
                    ]
                }
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },
        presets.PresetLineBreak1 = {
            category: 'Presets',
            name: '',
            type: 'text',
            text: ''
        },

        presets.curpstsetup = {
            category: 'Presets',
            type: 'button',
            name: 'Selected Preset',
            style: {
                text: 'Preset\\nID:\\n$(companion-module-emotimo-st4-3:CurrentPstSet)',
                size: 'auto',
                color: '16777215',
                bgcolor: combineRgb(0, 0, 0),
            },
            steps: [
                {
                    down: [
                        
                    ],
                    up: [

                    ],
                },
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },
        presets.curpstRunsetup = {
            category: 'Presets',
            type: 'button',
            name: 'Selected Preset Run',
            style: {
                text: 'Run:\\n$(companion-module-emotimo-st4-3:CurrentPstSetRun)',
                size: 'auto',
                color: '16777215',
                bgcolor: combineRgb(0, 0, 0),
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'resetPresetRunTimeSmart',
                        }
                    ],
                    up: [

                    ],
                },
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },
        presets.curpstRampsetup = {
            category: 'Presets',
            type: 'button',
            name: 'Selected Preset Ramp',
            style: {
                text: 'Ramp:\\n$(companion-module-emotimo-st4-3:CurrentPstSetRamp)',
                size: 'auto',
                color: '16777215',
                bgcolor: combineRgb(0, 0, 0),
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'resetPresetRampTimeSmart',
                        }
                    ],
                    up: [

                    ],
                },
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },
        presets.PresetLineBreak2 = {
            category: 'Presets',
            name: '',
            type: 'text',
            text: ''
        },

        presets.DecreasePstSetup = {
            category: 'Presets',
            type: 'button',
            name: 'Decrease Preset ID',
            style: {
                text: '⬇️',
                color: '16777215',
                bgcolor: combineRgb(50, 50, 0),
                // show_topbar: 0          //Hides the Top Bar
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'setPresetID',
                            options: {
                                direction: -1
                            }
                        }
                    ],
                    up: [
                    ]
                }
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },
        presets.smartDecreaseRun = {
            category: 'Presets',
            type: 'button',
            name: 'Decrease RunTime',
            style: {
                text: '⬇️',
                color: '16777215',
                bgcolor: combineRgb(0, 50, 100),
                // show_topbar: 0          //Hides the Top Bar
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'setPresetRunTimeSmart',
                            options: {
                                direction: -1
                            }
                        }
                    ],
                    up: [
                    ]
                }
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },      
        presets.smartDecreaseRamp = {
            category: 'Presets',
            type: 'button',
            name: 'Decrease RampTime',
            style: {
                text: '⬇️',
                color: '16777215',
                bgcolor: combineRgb(50, 0, 100),
                // show_topbar: 0          //Hides the Top Bar
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'setPresetRampTimeSmart',
                            options: {
                                direction: -1
                            }
                        }
                    ],
                    up: [
                    ]
                }
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },
        
        presets.recallSmart = {
            category: 'Presets',
            type: 'button',
            name: 'Preset Smart Recall',
            style: {
                text: 'Pre $(companion-module-emotimo-st4-3:CurrentPstSet)',
                color: '16777215',
                bgcolor: combineRgb(100, 0, 0),
                // show_topbar: 0          //Hides the Top Bar
            },
            steps: [
                {
                    down: [
                    ],
                    up: [
                        {
                            actionId: 'recallPsetSmart',
                            options: {
                                
                            }
                        }
                    ],
                    2000: {
                        options: {
                            runWhileHeld: true,
                        },
                        actions: [
                            {
                                actionId: 'savePsetSmart',
                                options: {
                                    
                                },
                                delay: 0,
                            },
                        ],
                    },
                },
            ],
            feedbacks: [
                {
                    feedbackId: 'SetPresetSmart',
                    options: {
                        
                    },
                    style: {
                        bgcolor: combineRgb(0, 127, 0),
                        color: combineRgb(0, 0, 0),
                    },
                },
            ]
        },
        presets.PresetHeader2 = {
            category: 'Presets',
            name: 'Rotary Encoders',
            type: 'text',
            text: 'These are only available for Surfaces that support Rotary Encoders (Ex. Streamdeck+)'
        },
        presets.PresetRunTimeRotary = {
            category: 'Presets',
            type: 'button',
            name: 'Preset Run Time Rotary',
            options: { rotaryActions: true },
            style: {
                text: 'Preset Run Time Rotary',
                size: 'auto',
                color: '16777215',
                bgcolor: combineRgb(0, 50, 50),
            },
            steps: [
                {
                    rotate_left: [
                        {
                            actionId: 'setPresetRunTimeSmart',
                            options: {
                                direction: -1
                            }
                        }
                    ],
                    rotate_right: [
                        {
                            actionId: 'setPresetRunTimeSmart',
                            options: {
                                direction: 1
                            }
                        }
                    ],
                    down: [
                        {
                            actionId: 'resetPresetRunTimeSmart'
                        }
                    ],
                    up: [

                    ],
                },
            ],
        },
        presets.PresetRampTimeRotary = {
            category: 'Presets',
            type: 'button',
            name: 'Preset Ramp Time Rotary',
            options: { rotaryActions: true },
            style: {
                text: 'Preset Ramp Time Rotary',
                size: 'auto',
                color: '16777215',
                bgcolor: combineRgb(0, 50, 50),
            },
            steps: [
                {
                    rotate_left: [
                        {
                            actionId: 'setPresetRampTimeSmart',
                            options: {
                                direction: -1
                            }
                        }
                    ],
                    rotate_right: [
                        {
                            actionId: 'setPresetRampTimeSmart',
                            options: {
                                direction: 1
                            }
                        }
                    ],
                    down: [
                        {
                            actionId: 'resetPresetRampTimeSmart'
                        }
                    ],
                    up: [

                    ],
                },
            ],
        }

        // for (let recall = 0; recall < 30; recall++) {
        //     presets['recallPreset' + recall] = {
        //         category: 'Presets',
        //         type: 'button',
        //         name: 'Preset ' + recall,
        //         style: {
        //             text: 'Pre ' + recall,
        //             color: '16777215',
        //             bgcolor: combineRgb(200, 0, 0),
        //             // show_topbar: 0          //Hides the Top Bar
        //         },
        //         steps: [
        //             {
        //                 down: [
        //                 ],
        //                 up: [
        //                     {
        //                         actionId: 'recallPset',
        //                         options: {
        //                             num: recall
        //                         }
        //                     }
        //                 ],
        //                 2000: {
        //                     options: {
        //                         runWhileHeld: true,
        //                     },
        //                     actions: [
        //                         {
        //                             actionId: 'savePset',
        //                             options: {
        //                                 num: recall
        //                             },
        //                             delay: 0,
        //                         },
        //                     ],
        //                 },
        //             },
        //         ],
        //         feedbacks: [
        //             {
        //                 feedbackId: 'SetPreset',
        //                 options: {
        //                     presetNum: recall
        //                 },
        //                 style: {
        //                     bgcolor: combineRgb(0, 127, 0),
        //                     color: combineRgb(0, 0, 0),
        //                 },
        //             },
        //         ]
        //     }
        // }

        for (let inc = 0; inc < 30; inc++) {
            presets['PresetHeaderHigh' + (inc+3)] = {
                category: 'Presets',
                name: 'Preset ' + inc,
                type: 'text',
                text: 'These are the buttons specific for Preset ' + inc
            },
            presets['increaseRunTime' + inc] = {
                category: 'Presets',
                type: 'button',
                name: 'Increase RunTime Preset ' + inc,
                style: {
                    text: '⬆️ ' + inc,
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 100),
                    // show_topbar: 0          //Hides the Top Bar
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'setPresetRunTime',
                                options: {
                                    id_pst: inc,
                                    direction: 1
                                }
                            }
                        ],
                        up: [
                        ]
                    }
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets['increaseRampTime' + inc] = {
                category: 'Presets',
                type: 'button',
                name: 'Increase RampTime Preset ' + inc,
                style: {
                    text: '⬆️ ' + inc,
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 100),
                    // show_topbar: 0          //Hides the Top Bar
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'setPresetRampTime',
                                options: {
                                    id_pst: inc,
                                    direction: 1
                                }
                            }
                        ],
                        up: [
                        ]
                    }
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets['PresetLineBreakHigh' + (inc+3)] = {
                category: 'Presets',
                name: '',
                type: 'text',
                text: ''
            },
            
            presets['Preset' + inc + 'RunTime'] = {
                category: 'Presets',
                type: 'button',
                name: 'Preset Run Time ' + inc,
                style: {
                    text: 'Pst\\nRunT:\\n$(companion-module-emotimo-st4-3:Pst' + inc + 'RunT)',
                    size: 'auto',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'resetPresetRunTime',
                                options: {
                                    id_pst: inc
                                }
                            }
                        ],
                        up: [

                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets['Preset' + inc + 'RampTime'] = {
                category: 'Presets',
                type: 'button',
                name: 'Preset Ramp Time ' + inc,
                style: {
                    text: 'Pst\\nRampT:\\n$(companion-module-emotimo-st4-3:Pst' + inc + 'RampT)',
                    size: 'auto',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'resetPresetRampTime',
                                options: {
                                    id_pst: inc
                                }
                            }
                        ],
                        up: [

                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets['PresetLineBreakMid' + (inc+3)] = {
                category: 'Presets',
                name: '',
                type: 'text',
                text: ''
            },

            presets['decreaseRunTime' + inc] = {
                category: 'Presets',
                type: 'button',
                name: 'Decrease RunTime Preset ' + inc,
                style: {
                    text: '⬇️ ' + inc,
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 100),
                    // show_topbar: 0          //Hides the Top Bar
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'setPresetRunTime',
                                options: {
                                    id_pst: inc,
                                    direction: -1
                                }
                            }
                        ],
                        up: [
                        ]
                    }
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets['decreaseRampTime' + inc] = {
                category: 'Presets',
                type: 'button',
                name: 'Decrease RampTime Preset ' + inc,
                style: {
                    text: '⬇️ ' + inc,
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 100),
                    // show_topbar: 0          //Hides the Top Bar
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'setPresetRampTime',
                                options: {
                                    id_pst: inc,
                                    direction: -1
                                }
                            }
                        ],
                        up: [
                        ]
                    }
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },

            presets['recallPreset' + inc] = {
                category: 'Presets',
                type: 'button',
                name: 'Preset ' + inc,
                style: {
                    text: 'Pre ' + inc,
                    color: '16777215',
                    bgcolor: combineRgb(200, 0, 0),
                    // show_topbar: 0          //Hides the Top Bar
                },
                steps: [
                    {
                        down: [
                        ],
                        up: [
                            {
                                actionId: 'recallPset',
                                options: {
                                    num: inc
                                }
                            }
                        ],
                        2000: {
                            options: {
                                runWhileHeld: true,
                            },
                            actions: [
                                {
                                    actionId: 'savePset',
                                    options: {
                                        num: inc
                                    },
                                    delay: 0,
                                },
                            ],
                        },
                    },
                ],
                feedbacks: [
                    {
                        feedbackId: 'SetPreset',
                        options: {
                            presetNum: inc
                        },
                        style: {
                            bgcolor: combineRgb(0, 127, 0),
                            color: combineRgb(0, 0, 0),
                        },
                    },
                ]
            },
            presets['PresetLineBreakLow' + (inc+3)] = {
                category: 'Presets',
                name: '',
                type: 'text',
                text: ''
            }
            
        }

        

        


        presets.IncreaseLpSetup = {
            category: 'Loops',
            type: 'button',
            name: 'Increase Loop ID',
            style: {
                text: '⬆️',
                color: '16777215',
                bgcolor: combineRgb(50, 50, 0),
                // show_topbar: 0          //Hides the Top Bar
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'setLoopID',
                            options: {
                                direction: 1
                            }
                        }
                    ],
                    up: [
                    ]
                }
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },
        presets.smartIncreaseAPoint = {
            category: 'Loops',
            type: 'button',
            name: 'Increase Loop A Point',
            style: {
                text: '⬆️',
                color: '16777215',
                bgcolor: combineRgb(0, 50, 100),
                // show_topbar: 0          //Hides the Top Bar
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'setLoopAPointSmart',
                            options: {
                                direction: 1
                            }
                        }
                    ],
                    up: [
                    ]
                }
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },
        presets.smartIncreaseBPoint = {
            category: 'Loops',
            type: 'button',
            name: 'Increase Loop B Point',
            style: {
                text: '⬆️',
                color: '16777215',
                bgcolor: combineRgb(0, 90, 100),
                // show_topbar: 0          //Hides the Top Bar
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'setLoopBPointSmart',
                            options: {
                                direction: 1
                            }
                        }
                    ],
                    up: [
                    ]
                }
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },
        presets.smartIncreaseRunLp = {
            category: 'Loops',
            type: 'button',
            name: 'Increase Loop RunTime',
            style: {
                text: '⬆️',
                color: '16777215',
                bgcolor: combineRgb(0, 50, 100),
                // show_topbar: 0          //Hides the Top Bar
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'setLoopRunTimeSmart',
                            options: {
                                direction: 1
                            }
                        }
                    ],
                    up: [
                    ]
                }
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },
        presets.smartIncreaseRampLp = {
            category: 'Loops',
            type: 'button',
            name: 'Increase Loop RampTime',
            style: {
                text: '⬆️',
                color: '16777215',
                bgcolor: combineRgb(50, 0, 100),
                // show_topbar: 0          //Hides the Top Bar
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'setLoopRampTimeSmart',
                            options: {
                                direction: 1
                            }
                        }
                    ],
                    up: [
                    ]
                }
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },
        presets.LineBreak2 = {
            category: 'Loops',
            name: '',
            type: 'text',
            text: ' '
        },

        presets.curLpsetup = {
            category: 'Loops',
            type: 'button',
            name: 'Selected Loop',
            style: {
                text: 'Loop\\nID:\\n$(companion-module-emotimo-st4-3:CurrentLpSet)',
                size: 'auto',
                color: '16777215',
                bgcolor: combineRgb(0, 0, 0),
            },
            steps: [
                {
                    down: [
                        
                    ],
                    up: [

                    ],
                },
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },
        presets.curLpAPointsetup = {
            category: 'Loops',
            type: 'button',
            name: 'Selected Loop A Point',
            style: {
                text: 'Loop A Point:\\n$(companion-module-emotimo-st4-3:CurrentLpA)',
                size: 'auto',
                color: '16777215',
                bgcolor: combineRgb(0, 0, 0),
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'recallAPointSmart',
                            options: {
                                
                            }
                        }
                    ],
                    up: [

                    ],
                },
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },
        presets.curLpBPointsetup = {
            category: 'Loops',
            type: 'button',
            name: 'Selected Loop B Point',
            style: {
                text: 'Loop B Point:\\n$(companion-module-emotimo-st4-3:CurrentLpB)',
                size: 'auto',
                color: '16777215',
                bgcolor: combineRgb(0, 0, 0),
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'recallBPointSmart',
                            options: {
                                
                            }
                        }
                    ],
                    up: [

                    ],
                },
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },
        presets.curLpRunsetup = {
            category: 'Loops',
            type: 'button',
            name: 'Selected Loop Run',
            style: {
                text: 'Loop Run:\\n$(companion-module-emotimo-st4-3:CurrentLpRun)',
                size: 'auto',
                color: '16777215',
                bgcolor: combineRgb(0, 0, 0),
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'resetLoopRunTimeSmart',
                        }
                    ],
                    up: [

                    ],
                },
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },
        presets.curLpRampsetup = {
            category: 'Loops',
            type: 'button',
            name: 'Selected Loop Ramp',
            style: {
                text: 'Loop Ramp:\\n$(companion-module-emotimo-st4-3:CurrentLpRamp)',
                size: 'auto',
                color: '16777215',
                bgcolor: combineRgb(0, 0, 0),
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'resetLoopRampTimeSmart',
                        }
                    ],
                    up: [

                    ],
                },
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },
        presets.LineBreak3 = {
            category: 'Loops',
            name: '',
            type: 'text',
            text: ' '
        },

        presets.DecreaseLpSetup = {
            category: 'Loops',
            type: 'button',
            name: 'Decrease Loop ID',
            style: {
                text: '⬇️',
                color: '16777215',
                bgcolor: combineRgb(50, 50, 0),
                // show_topbar: 0          //Hides the Top Bar
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'setLoopID',
                            options: {
                                direction: -1
                            }
                        }
                    ],
                    up: [
                    ]
                }
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },
        presets.smartDecreaseAPoint = {
            category: 'Loops',
            type: 'button',
            name: 'Decrease Loop A Point',
            style: {
                text: '⬇️',
                color: '16777215',
                bgcolor: combineRgb(0, 50, 100),
                // show_topbar: 0          //Hides the Top Bar
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'setLoopAPointSmart',
                            options: {
                                direction: -1
                            }
                        }
                    ],
                    up: [
                    ]
                }
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },
        presets.smartDecreaseBPoint = {
            category: 'Loops',
            type: 'button',
            name: 'Decrease Loop B Point',
            style: {
                text: '⬇️',
                color: '16777215',
                bgcolor: combineRgb(0, 90, 100),
                // show_topbar: 0          //Hides the Top Bar
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'setLoopBPointSmart',
                            options: {
                                direction: -1
                            }
                        }
                    ],
                    up: [
                    ]
                }
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },
        presets.smartDecreaseRunLp = {
            category: 'Loops',
            type: 'button',
            name: 'Decrease Loop RunTime',
            style: {
                text: '⬇️',
                color: '16777215',
                bgcolor: combineRgb(0, 50, 100),
                // show_topbar: 0          //Hides the Top Bar
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'setLoopRunTimeSmart',
                            options: {
                                direction: -1
                            }
                        }
                    ],
                    up: [
                    ]
                }
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },
        presets.smartDecreaseRampLp = {
            category: 'Loops',
            type: 'button',
            name: 'Decrease Loop RampTime',
            style: {
                text: '⬇️',
                color: '16777215',
                bgcolor: combineRgb(50, 0, 100),
                // show_topbar: 0          //Hides the Top Bar
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'setLoopRampTimeSmart',
                            options: {
                                direction: -1
                            }
                        }
                    ],
                    up: [
                    ]
                }
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },

        
        presets.recallLpSmart = {
            category: 'Loops',
            type: 'button',
            name: 'Loop Smart Recall',
            style: {
                text: 'Loop $(companion-module-emotimo-st4-3:CurrentLpSet)',
                color: '16777215',
                bgcolor: combineRgb(100, 0, 0),
                // show_topbar: 0          //Hides the Top Bar
            },
            steps: [
                {
                    down: [
                    ],
                    up: [
                        {
                            actionId: 'recallLpSmart',
                            options: {
                                
                            }
                        }
                    ],
                },
            ],
            feedbacks: [
                {
                    feedbackId: 'LoopStatus',
                    options: {
                        
                    },
                    style: {
                        bgcolor: combineRgb(0, 127, 0),
                        color: combineRgb(0, 0, 0),
                    },
                },
            ]
        },

        presets.LoopEncoderHeader = {
            category: 'Loops',
            name: 'Rotary Encoders',
            type: 'text',
            text: 'These are only available for Surfaces that support Rotary Encoders (Ex. Streamdeck+)'
        },
        presets.LoopRunTimeRotary = {
            category: 'Loops',
            type: 'button',
            name: 'Loop Run Time Rotary',
            options: { rotaryActions: true },
            style: {
                text: 'Loop Run Time Rotary',
                size: 'auto',
                color: '16777215',
                bgcolor: combineRgb(0, 50, 100),
            },
            steps: [
                {
                    rotate_left: [
                        {
                            actionId: 'setLoopRunTimeSmart',
                            options: {
                                direction: -1
                            }
                        }
                    ],
                    rotate_right: [
                        {
                            actionId: 'setLoopRunTimeSmart',
                            options: {
                                direction: 1
                            }
                        }
                    ],
                    down: [
                        {
                            actionId: 'resetLoopRunTimeSmart'
                        }
                    ],
                    up: [

                    ],
                },
            ],
        },
        presets.LoopRampTimeRotary = {
            category: 'Loops',
            type: 'button',
            name: 'Loop Ramp Time Rotary',
            options: { rotaryActions: true },
            style: {
                text: 'Loop Ramp Time Rotary',
                size: 'auto',
                color: '16777215',
                bgcolor: combineRgb(0, 50, 100),
            },
            steps: [
                {
                    rotate_left: [
                        {
                            actionId: 'setLoopRampTimeSmart',
                            options: {
                                direction: -1
                            }
                        }
                    ],
                    rotate_right: [
                        {
                            actionId: 'setLoopRampTimeSmart',
                            options: {
                                direction: 1
                            }
                        }
                    ],
                    down: [
                        {
                            actionId: 'resetLoopRampTimeSmart'
                        }
                    ],
                    up: [

                    ],
                },
            ],
        },
        presets.LoopAPointRotary = {
            category: 'Loops',
            type: 'button',
            name: 'Loop A Point Rotary',
            options: { rotaryActions: true },
            style: {
                text: 'Loop A Point Rotary',
                size: '14',
                color: '16777215',
                bgcolor: combineRgb(0, 50, 100),
            },
            steps: [
                {
                    rotate_left: [
                        {
                            actionId: 'setLoopAPointSmart',
                            options: {
                                direction: -1
                            }
                        }
                    ],
                    rotate_right: [
                        {
                            actionId: 'setLoopAPointSmart',
                            options: {
                                direction: 1
                            }
                        }
                    ],
                    down: [
                        {
                            actionId: 'recallAPointSmart'
                        }
                    ],
                    up: [

                    ],
                },
            ],
        },
        presets.LoopBPointRotary = {
            category: 'Loops',
            type: 'button',
            name: 'Loop B Point Rotary',
            options: { rotaryActions: true },
            style: {
                text: 'Loop B Point Rotary',
                size: '14',
                color: '16777215',
                bgcolor: combineRgb(0, 50, 100),
            },
            steps: [
                {
                    rotate_left: [
                        {
                            actionId: 'setLoopBPointSmart',
                            options: {
                                direction: -1
                            }
                        }
                    ],
                    rotate_right: [
                        {
                            actionId: 'setLoopBPointSmart',
                            options: {
                                direction: 1
                            }
                        }
                    ],
                    down: [
                        {
                            actionId: 'recallBPointSmart'
                        }
                    ],
                    up: [

                    ],
                },
            ],
        }
        

        // ########################
        // ####     Loops      ####
        // ########################
        for (let inc = 0; inc < 8; inc++) {
            presets['Loop' + inc + 'HighLine'] = {
                category: 'Loops',
                name: 'Loop ' + inc,
                type: 'text',
                text: 'Setup and Recall Buttons for Loop ' + inc
            },
            presets['increaseLpRunTime' + inc] = {
                category: 'Loops',
                type: 'button',
                name: 'Increase RunTime Loop ' + inc,
                style: {
                    text: '⬆️ ' + inc,
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 100),
                    // show_topbar: 0          //Hides the Top Bar
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'setLoopRunTime',
                                options: {
                                    id_loop: inc,
                                    direction: 1
                                }
                            }
                        ],
                        up: [
                        ]
                    }
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets['increaseLpRampTime' + inc] = {
                category: 'Loops',
                type: 'button',
                name: 'Increase RampTime Loop ' + inc,
                style: {
                    text: '⬆️ ' + inc,
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 100),
                    // show_topbar: 0          //Hides the Top Bar
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'setLoopRampTime',
                                options: {
                                    id_loop: inc,
                                    direction: 1
                                }
                            }
                        ],
                        up: [
                        ]
                    }
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets['Loop' + inc + 'APointInc'] = {
                category: 'Loops',
                type: 'button',
                name: 'Loop ' + inc + ' A Point Inc',
                style: {
                    text: '⬆️ ' + inc,
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 100),
                    // show_topbar: 0          //Hides the Top Bar
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'setLoopAPoint',
                                options: {
                                    id_loop: inc,
                                    direction: 1
                                }
                            }
                        ],
                        up: [
                        ]
                    }
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets['Loop' + inc + 'BPointInc'] = {
                category: 'Loops',
                type: 'button',
                name: 'Loop ' + inc + ' B Point Inc',
                style: {
                    text: '⬆️ ' + inc,
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 100),
                    // show_topbar: 0          //Hides the Top Bar
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'setLoopBPoint',
                                options: {
                                    id_loop: inc,
                                    direction: 1
                                }
                            }
                        ],
                        up: [
                        ]
                    }
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets['Loop' + inc + 'LineBreak'] = {
            category: 'Loops',
            name: '',
            type: 'text',
            text: ' '
            },

            presets['Loop' + inc + 'RunTime'] = {
                category: 'Loops',
                type: 'button',
                name: 'Loop Run Time ' + inc,
                style: {
                    text: 'Loop\\nRunT:\\n$(companion-module-emotimo-st4-3:Lp' + inc + 'RunT)',
                    size: 'auto',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'resetLoopRunTime',
                                options: {
                                    id_loop: inc
                                }
                            }
                        ],
                        up: [

                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets['Loop' + inc + 'RampTime'] = {
                category: 'Loops',
                type: 'button',
                name: 'Loop Ramp Time ' + inc,
                style: {
                    text: 'Loop\\nRampT:\\n$(companion-module-emotimo-st4-3:Lp' + inc + 'RampT)',
                    size: 'auto',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'resetLoopRampTime',
                                options: {
                                    id_loop: inc
                                }
                            }
                        ],
                        up: [

                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets['Loop' + inc + 'APoint'] = {
                category: 'Loops',
                type: 'button',
                name: 'Loop A Point ' + inc,
                style: {
                    text: 'Loop\\nA Point:\\n$(companion-module-emotimo-st4-3:Lp' + inc + 'APoint)',
                    size: 'auto',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'recallAPoint',
                                options: {
                                    id_loop: inc
                                }
                            }
                        ],
                        up: [

                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets['Loop' + inc + 'BPoint'] = {
                category: 'Loops',
                type: 'button',
                name: 'Loop B Point ' + inc,
                style: {
                    text: 'Loop\\nB Point:\\n$(companion-module-emotimo-st4-3:Lp' + inc + 'BPoint)',
                    size: 'auto',
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 0),
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'recallBPoint',
                                options: {
                                    id_loop: inc
                                }
                            }
                        ],
                        up: [

                        ],
                    },
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets['Loop' + inc + 'LowLineBreak'] = {
                category: 'Loops',
                name: '',
                type: 'text',
                text: ' '
            },

            presets['decreaseLpRunTime' + inc] = {
                category: 'Loops',
                type: 'button',
                name: 'Decrease RunTime Loop ' + inc,
                style: {
                    text: '⬇️ ' + inc,
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 100),
                    // show_topbar: 0          //Hides the Top Bar
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'setLoopRunTime',
                                options: {
                                    id_loop: inc,
                                    direction: -1
                                }
                            }
                        ],
                        up: [
                        ]
                    }
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets['decreaseLpRampTime' + inc] = {
                category: 'Loops',
                type: 'button',
                name: 'Decrease RampTime Loop ' + inc,
                style: {
                    text: '⬇️ ' + inc,
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 100),
                    // show_topbar: 0          //Hides the Top Bar
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'setLoopRampTime',
                                options: {
                                    id_loop: inc,
                                    direction: -1
                                }
                            }
                        ],
                        up: [
                        ]
                    }
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },          
            presets['Loop' + inc + 'APointDec'] = {
                category: 'Loops',
                type: 'button',
                name: 'Loop ' + inc + ' A Point Dec',
                style: {
                    text: '⬇️ ' + inc,
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 100),
                    // show_topbar: 0          //Hides the Top Bar
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'setLoopAPoint',
                                options: {
                                    id_loop: inc,
                                    direction: -1
                                }
                            }
                        ],
                        up: [
                        ]
                    }
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },
            presets['Loop' + inc + 'BPointDec'] = {
                category: 'Loops',
                type: 'button',
                name: 'Loop ' + inc + ' B Point Dec',
                style: {
                    text: '⬇️ ' + inc,
                    color: '16777215',
                    bgcolor: combineRgb(0, 0, 100),
                    // show_topbar: 0          //Hides the Top Bar
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'setLoopBPoint',
                                options: {
                                    id_loop: inc,
                                    direction: -1
                                }
                            }
                        ],
                        up: [
                        ]
                    }
                ],
                feedbacks: [
                    {
                        style: {
                            color: foregroundColor,
                            bgcolor: backgroundColorRed,
                        }
                    }
                ]
            },

            presets['Loop' + inc + 'Recall'] = {
                category: 'Loops',
                type: 'button',
                name: 'Loop ' + inc + ' Recall',
                style: {
                    text: 'Loop\\n' + inc + '\\nRecall',
                    size: 'auto',
                    color: '16777215',
                    bgcolor: combineRgb(127, 0, 0),
                },
                steps: [
                    {
                        down: [
                            {
                                actionId: 'recallLoop',
                                options: {
                                    id_loop: inc
                                }
                            }
                        ],
                        up: [

                        ],
                    },
                ],
                feedbacks: [
                    {
                        feedbackId: 'LoopStatus',
                        style: {
                            bgcolor: combineRgb(0, 127, 0),
                            color: combineRgb(0, 0, 0),
                        },
                    },
                ]
            }
            
        }

        // #######################################
        // ####     Streamdeck+ Encoders      ####
        // #######################################

        


        // ########################
        // ####     Other      ####
        // ########################
        presets.rsHome = {
            category: 'Other',
            type: 'button',
            name: 'Center RS',
            style: {
                text: 'Center RS',
                size: 'auto',
                color: '16777215',
                bgcolor: combineRgb(0, 0, 0),
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'homeRS'
                        }
                    ],
                    up: [

                    ],
                },
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },
        presets.calibrateTN = {
            category: 'Other',
            type: 'button',
            name: 'Calibrate TN Motor',
            style: {
                text: 'Cal. TN Motor',
                size: 'auto',
                color: '16777215',
                bgcolor: combineRgb(0, 0, 0),
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'calibrateTNMotor',
                            id_mot: 5
                        }
                    ],
                    up: [

                    ],
                },
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },
        presets.calibrateAllTN = {
            category: 'Other',
            type: 'button',
            name: 'Calibrate All TN',
            style: {
                text: 'Cal. All TN',
                size: 'auto',
                color: '16777215',
                bgcolor: combineRgb(0, 0, 0),
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'calibrateAllTN'
                        }
                    ],
                    up: [

                    ],
                },
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },
        presets.zeroMotor = {
            category: 'Other',
            type: 'button',
            name: 'Zero Motors',
            style: {
                text: 'Zero Motors',
                size: 'auto',
                color: '16777215',
                bgcolor: combineRgb(0, 0, 0),
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'zeroMotors'
                        }
                    ],
                    up: [

                    ],
                },
            ],
            feedbacks: [
                {
                    style: {
                        color: foregroundColor,
                        bgcolor: backgroundColorRed,
                    }
                }
            ]
        },

        // for (let increaseRunTime = 0; increaseRunTime < 30; increaseRunTime++) {
        //     presets['increaseRunTime' + increaseRunTime] = {
        //         category: 'Preset Timing',
        //         name: 'Increase RunTime Preset ' + increaseRunTime,
        //         type: 'button',
        //         style: {
        //             text: 'Increase Run\\nT' + increaseRunTime,
        //             size: '14',
        //             // png64: '\x2B06',
        //             color: '16777215',
        //             bgcolor: combineRgb(0, 0, 0),
        //         },
        //         steps: [
        //             {
        //                 down: [
        //                     {
        //                         actionId: 'presetRunTimeU',
        //                         options: {
        //                             num: increaseRunTime
        //                         }
        //                     }
        //                 ],
        //                 up: []
        //             },
        //         ],
        //         feedbacks: [
        //             {
        //                 style: {
        //                     color: foregroundColor,
        //                     bgcolor: backgroundColorRed,
        //                 }
        //             }
        //         ]
        //     }
        // }

        // for (let decreaseRunTime = 0; decreaseRunTime < 30; decreaseRunTime++) {
        //     presets['decreaseRunTime' + decreaseRunTime] = {
        //         category: 'Preset Timing',
        //         name: 'Decrease RunTime Preset ' + decreaseRunTime,
        //         type: 'button',
        //         style: {
        //             text: 'Decrease Run\\nT' + decreaseRunTime,
        //             size: '14',
        //             color: '16777215',
        //             bgcolor: combineRgb(0, 0, 0),
        //         },
        //         steps: [
        //             {
        //                 down: [
        //                     {
        //                         actionId: 'presetRunTimeD',
        //                         options: {
        //                             num: decreaseRunTime
        //                         }
        //                     }
        //                 ],
        //                 up: []
        //             },
        //         ],
        //         feedbacks: [
        //             {
        //                 style: {
        //                     color: foregroundColor,
        //                     bgcolor: backgroundColorRed,
        //                 }
        //             }
        //         ]
        //     }
        // }

        // for (let increaseRampTime = 0; increaseRampTime < 30; increaseRampTime++) {
        //     presets['increaseRampTime' + increaseRampTime] = {
        //         category: 'Preset Timing',
        //         name: 'Increase RampTime Preset ' + increaseRampTime,
        //         type: 'button',
        //         style: {
        //             text: 'Increase Ramp\\nT' + increaseRampTime,
        //             size: '14',
        //             color: '16777215',
        //             bgcolor: combineRgb(0, 0, 0),
        //         },
        //         steps: [
        //             {
        //                 down: [
        //                     {
        //                         actionId: 'presetRampTimeU',
        //                         options: {
        //                             num: increaseRampTime
        //                         }
        //                     }
        //                 ],
        //                 up: []
        //             },
        //         ],
        //         feedbacks: [
        //             {
        //                 style: {
        //                     color: foregroundColor,
        //                     bgcolor: backgroundColorRed,
        //                 }
        //             }
        //         ]
        //     }
        // }

        // for (let decreaseRampTime = 0; decreaseRampTime < 30; decreaseRampTime++) {
        //     presets['decreaseRampTime' + decreaseRampTime] = {
        //         category: 'Preset Timing',
        //         name: 'Decrease RampTime Preset ' + decreaseRampTime,
        //         type: 'button',
        //         style: {
        //             text: 'Decrease Ramp\\nT' + decreaseRampTime,
        //             size: '14',
        //             color: '16777215',
        //             bgcolor: combineRgb(0, 0, 0),
        //         },
        //         steps: [
        //             {
        //                 down: [
        //                     {
        //                         actionId: 'presetRampTimeD',
        //                         options: {
        //                             num: decreaseRampTime
        //                         }
        //                     }
        //                 ],
        //                 up: []
        //             },
        //         ],
        //         feedbacks: [
        //             {
        //                 style: {
        //                     color: foregroundColor,
        //                     bgcolor: backgroundColorRed,
        //                 }
        //             }
        //         ]
        //     }
        // }

        // ########################
        // #### Loop   Presets ####
        // ########################

        // for (let loopPresets = 0; loopPresets < 8; loopPresets++) {
        //     presets['saveLoopPresets' + loopPresets] = {
        //         category: 'Loops',
        //         name: 'Setup Loop ' + loopPresets,
        //         style: {
        //             text: 'Setup Loop\\n' + loopPresets,
        //             size: '14',
        //             color: '16777215',
        //             bgcolor: combineRgb(0, 0, 0),
        //         },
        //         steps: [
        //             {
        //                 down: [
        //                     {
        //                         actionId: 'setLoop',
        //                         options: {
        //                             num: loopPresets
        //                         }
        //                     }
        //                 ],
        //                 up: []
        //             },
        //         ],
        //         feedbacks: [
        //             {
        //                 style: {
        //                     color: foregroundColor,
        //                     bgcolor: backgroundColorRed,
        //                 }
        //             }
        //         ]
        //     }
        // }

        // for (let loopPresets = 0; loopPresets < 8; loopPresets++) {
        //     presets['recallLoopPresets' + loopPresets] = {
        //         category: 'Loops',
        //         name: 'Start Loop ' + loopPresets,
        //         style: {
        //             text: 'Start Loop\\n' + loopPresets,
        //             size: '14',
        //             color: '16777215',
        //             bgcolor: combineRgb(0, 0, 0),
        //         },
        //         steps: [
        //             {
        //                 down: [
        //                     {
        //                         actionId: 'startLoop',
        //                         options: {
        //                             num: loopPresets
        //                         }
        //                     }
        //                 ],
        //                 up: []
        //             },
        //         ],
        //         feedbacks: [
        //             {
        //                 style: {
        //                     color: foregroundColor,
        //                     bgcolor: backgroundColorRed,
        //                 }
        //             }
        //         ]
        //     }

        // }

        // presets.StopLoop = {
        //     category: 'Loops',
        //     name: 'Stop Loop',
        //     style: {
        //         text: 'Stop Loop\\n',
        //         size: '14',
        //         color: '16777215',
        //         bgcolor: combineRgb(0, 0, 0),
        //     },
        //     steps: [
        //         {
        //             down: [
        //                 {
        //                     actionId: 'stopLoop',
        //                 }
        //             ],
        //             up: []
        //         },
        //     ],
        //     feedbacks: [
        //         {
        //             style: {
        //                 color: foregroundColor,
        //                 bgcolor: backgroundColorRed,
        //             }
        //         }
        //     ]
        // }

        this.setPresetDefinitions(presets);
    }
}