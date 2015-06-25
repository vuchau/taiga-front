var utils = require('../utils');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('backlog', function() {
    before(async function() {
        browser.get('http://localhost:9001/project/user7-project-example-0/backlog');

        await utils.common.waitLoader();

        utils.common.takeScreenshot('backlog', 'backlog');
    });

    describe('create US', function() {
        let createUSLightbox = null;

        before(async function() {
            $$('.new-us a').get(0).click();

            await utils.lightbox.open('div[tg-lb-create-edit-userstory]');

            createUSLightbox = $('div[tg-lb-create-edit-userstory]');
        });

        it('capture screen', function() {
            utils.common.takeScreenshot('backlog', 'create-us');
        });

        it('fill form', async function() {
            // subject
            createUSLightbox.$('input[name="subject"]').sendKeys('subject');

            // roles
            let roles = createUSLightbox.$$('.points-per-role li');

            let role1 = roles.get(1);
            await utils.popover.open(role1, 3);

            let role2 = roles.get(3);
            await utils.popover.open(role2, 4);

            let totalPoints = await roles.get(0).$('.points').getText();

            expect(totalPoints).to.be.equal('3');

            // status
            createUSLightbox.$('select option:nth-child(2)').click();

            // tags
            $('.tag-input').sendKeys('aaa');
            browser.actions().sendKeys(protractor.Key.ENTER).perform();

            $('.tag-input').sendKeys('bbb');
            browser.actions().sendKeys(protractor.Key.ENTER).perform();

            // description
            createUSLightbox.$('textarea[name="description"]').sendKeys('test test');

            //settings
            createUSLightbox.$$('.settings label').get(0).click();

            await browser.sleep(200);

            utils.common.takeScreenshot('backlog', 'create-us-filled');
        });

        it('send form', async function() {
            let usCount = await $$('.backlog-table-body > div').count();

            createUSLightbox.$('button[type="submit"]').click();

            await utils.lightbox.close(createUSLightbox);

            let newUsCount = await $$('.backlog-table-body > div').count();

            expect(newUsCount).to.be.equal(usCount + 1);
        });
    });

    describe('bulk create US', function() {
        let createUSLightbox = null;

        before(async function() {
            $$('.new-us a').get(1).click();

            await utils.lightbox.open('div[tg-lb-create-bulk-userstories]');

            createUSLightbox = $('div[tg-lb-create-bulk-userstories]');
        });

        it('fill form', function() {
            createUSLightbox.$('textarea').sendKeys('aaa');
            browser.actions().sendKeys(protractor.Key.ENTER).perform();

            createUSLightbox.$('textarea').sendKeys('bbb');
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
        });

        it('send form', async function() {
            let usCount = await $$('.backlog-table-body > div').count();

            createUSLightbox.$('button[type="submit"]').click();

            await utils.lightbox.close(createUSLightbox);

            let newUsCount = await $$('.backlog-table-body > div').count();

            expect(newUsCount).to.be.equal(usCount + 2);
        });
    });

    describe('edit US', function() {
        let editUSLightbox = null;

        before(async function() {
            $$('.backlog-table-body .icon-edit').first().click();

            await utils.lightbox.open('div[tg-lb-create-edit-userstory]');

            editUSLightbox = $('div[tg-lb-create-edit-userstory]');
        });

        it('fill form', async function() {
            // subject
            editUSLightbox.$('input[name="subject"]').sendKeys('subjectedit');

            // roles
            let roles = editUSLightbox.$$('.points-per-role li');

            let role1 = roles.get(1);
            await utils.popover.open(role1, 3);

            let role2 = roles.get(2);
            await utils.popover.open(role2, 3);

            let role3 = roles.get(3);
            await utils.popover.open(role3, 3);

            let role4 = roles.get(4);
            await utils.popover.open(role4, 3);

            let totalPoints = await roles.get(0).$('.points').getText();

            expect(totalPoints).to.be.equal('4');

            // status
            editUSLightbox.$('select option:nth-child(3)').click();

            // tags
            $('.tag-input').sendKeys('www');
            browser.actions().sendKeys(protractor.Key.ENTER).perform();

            $('.tag-input').sendKeys('xxx');
            browser.actions().sendKeys(protractor.Key.ENTER).perform();

            // description
            editUSLightbox.$('textarea[name="description"]').sendKeys('test test test test');

            //settings
            editUSLightbox.$$('.settings label').get(1).click();

            await browser.sleep(200);
        });

        it('send form', async function() {
            editUSLightbox.$('button[type="submit"]').click();

            await utils.lightbox.close(editUSLightbox);
        });
    });

    it('edit status inline', async function() {
        let status = $$('.backlog-table-body > div .us-status').first();

        await utils.popover.open(status, 1);

        //debounce
        await browser.sleep(2000);

        await utils.popover.open(status, 2);

        let statusText = await status.$$('span').first().getText();

        expect(statusText).to.be.equal('In progress');

    });
});
