describe "tgThemeService", ->
    themeService = null
    data = {
        theme: "testTheme"
    }

    _inject = (callback) ->
        inject (_tgThemeService_) ->
            themeService = _tgThemeService_
            callback() if callback

    beforeEach ->
        module "taigaCommon"
        _inject()

    it "use a test theme", () ->
        themeService.use(data.theme)
        expect($("link[rel='stylesheet']")).to.have.attr("href", "/styles/theme-#{data.theme}.css")
