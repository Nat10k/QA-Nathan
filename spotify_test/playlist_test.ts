import { makeFakeAvatar } from "../data-faker";

Feature('spotify playlist').tag('@spotify');

Before(({ login }) => {
    login('spotify');
});

Scenario('create a playlist', async ({ I }) => {
    I.click(locate('button').withAttr({'aria-label':'Create playlist or folder'}).inside(locate('nav')));
    I.click(locate('button').withAttr({role:'menuitem'}).withChild(locate('span').withText('Create a new playlist')).inside(locate('ul').withAttr({role:'menu'})));
    I.waitForText('My Playlist', 10);
});

Scenario('open created playlist', async ({ I }) => {
    I.click(locate('div').withAttr({role:'button'}).inside(locate('ul').withAttr({role:'list', 'aria-label':'Your Library'})));
    I.waitForText('My Playlist', 10);
});

Scenario('add a few songs', async ({ I }) => {
    I.click(locate('div').withAttr({role:'button'}).inside(locate('ul').withAttr({role:'list', 'aria-label':'Your Library'})));
    I.waitForText('My Playlist', 10);
    I.fillField(locate('input').withAttr({role:'searchbox'}).inside(locate('div').withAttr({role:'search'}).
                inside(locate('div').withClassAttr('main-view-container'))), 'Persona 3');
    I.wait(2);
    for (let i=1; i<=7; i++) {
        I.click(locate('button').withAttr({'data-testid':'add-to-playlist-button'}).at(i));
    }
    I.seeNumberOfVisibleElements(locate('div').withAttr({role:'row'}).
                                 inside(locate('div').withAttr({'data-testid':'playlist-tracklist'})),
                                 8);
});

Scenario('edit the playlist details', async ({ I }) => {
    I.rightClick(locate('div').withAttr({role:'button'}).inside(locate('ul').withAttr({role:'list', 'aria-label':'Your Library'})));
    I.click(locate('button').withAttr({role:'menuitem'}).inside(locate('div').withAttr({'data-testid':'context-menu'})).
            withChild(locate('span').withText('Edit details')));
    let editModal = locate('div').withAttr({'data-testid':'playlist-edit-details-modal'});
    // Playlist picture
    await makeFakeAvatar('fakeAvatar.jpg');
    I.attachFile(locate('input').withAttr({type:'file','data-testid':'image-file-picker'}).inside(editModal), 'fakeAvatar.jpg');
    I.wait(5);
    // Change playlist name
    I.fillField(locate('input').withAttr({type:'text', 'data-testid':'playlist-edit-details-name-input'}).inside(editModal), 'Test Playlist');
    I.fillField(locate('textarea').withAttr({'data-testid':'playlist-edit-details-description-input'}).inside(editModal), 'Test Playlist Description');
    I.click(locate('button').withAttr({'data-testid':'playlist-edit-details-save-button'}).inside(editModal));
    I.waitForText('Test Playlist', 5);
});

Scenario('play the playlist', async ({ I }) => {
    I.click(locate('div').withAttr({role:'button'}).inside(locate('ul').withAttr({role:'list', 'aria-label':'Your Library'})));
    I.waitForText('Test Playlist', 10);
    I.click(locate('button').withAttr({'data-testid':'play-button'}));
    I.waitForElement(locate('aside').withAttr({'aria-label':'Now playing view'}), 5);
});

Scenario('remove songs from the playlist', async ({ I }) => {
    I.click(locate('div').withAttr({role:'button'}).inside(locate('ul').withAttr({role:'list', 'aria-label':'Your Library'})));
    I.waitForText('Test Playlist', 10);
    for (let i=0; i<3; i++) {
        I.rightClick(locate('div').withAttr({'data-testid':'tracklist-row'}).
                                 inside(locate('div').withAttr({'data-testid':'playlist-tracklist'})).at(1));
        I.click(locate('button').withAttr({role:'menuitem'}).inside(locate('div').withAttr({'data-testid':'context-menu'})).
                                 withChild(locate('span').withText('Remove from this playlist')));
    }
});

Scenario('create a playlist folder', async ({ I }) => {
    I.click(locate('button').withAttr({'aria-label':'Create playlist or folder'}).inside(locate('nav')));
    I.click(locate('button').withAttr({role:'menuitem'}).withChild(locate('span').withText('Create a playlist folder')).inside(locate('ul').withAttr({role:'menu'})));
    I.waitForText('New Folder', 10);
});

Scenario('rename folder', async ({ I }) => {
    I.rightClick(locate('div').withAttr({role:'button'}).inside(locate('ul').withAttr({role:'list', 'aria-label':'Your Library'})));
    I.click(locate('button').withAttr({role:'menuitem'}).inside(locate('div').withAttr({'data-testid':'context-menu'})).
            withChild(locate('span').withText('Rename')));
    let editModal = locate('div').withAttr({'data-testid':'playlist-edit-details-modal'});
    // Change folder name
    I.fillField(locate('input').withAttr({type:'text'}).inside(locate('form').inside(editModal)), 'Test Folder');
    I.click(locate('button').withAttr({type:'submit'}).withChild(locate('span').withText('Save')).inside(editModal));
    I.waitForText('Test Folder', 5);
});

Scenario('move playlist inside folder', async ({ I }) => {
    I.rightClick(locate('div').withAttr({role:'button'}).inside(locate('ul').withAttr({role:'list', 'aria-label':'Your Library'})).last());
    I.click(locate('button').withAttr({role:'menuitem'}).inside(locate('div').withAttr({'data-testid':'context-menu'})).
            withDescendant(locate('span').withText('Move to folder')));
    I.click(locate('button').withAttr({role:'menuitem'}).withChild(locate('span').withText('Test Folder').inside(locate('ul').withAttr({role:'menu', 'data-depth':'1'}))));
    I.wait(2);
    I.dontSee('Test Playlist');
});

Scenario('move playlist out from folder', async ({ I }) => {
    I.click(locate('div').withAttr({role:'button'}).inside(locate('ul').withAttr({role:'list', 'aria-label':'Your Library'})));
    I.rightClick(locate('div').withAttr({role:'button'}).inside(locate('ul').withAttr({role:'list', 'aria-label':'Your Library'})));
    I.click(locate('button').withAttr({role:'menuitem'}).inside(locate('div').withAttr({'data-testid':'context-menu'})).
            withDescendant(locate('span').withText('Move to folder')));
    I.click(locate('button').withAttr({role:'menuitem'}).withChild(locate('span').withText('Remove from folders').inside(locate('ul').withAttr({role:'menu', 'data-depth':'1'}))));
    I.wait(2);
    I.dontSee('Test Playlist');
});

Scenario('delete folder', async ({ I }) => {
    I.rightClick(locate('div').withAttr({role:'button'}).inside(locate('ul').withAttr({role:'list', 'aria-label':'Your Library'})));
    I.click(locate('button').withAttr({role:'menuitem'}).inside(locate('div').withAttr({'data-testid':'context-menu'})).
            withChild(locate('span').withText('Delete')));
    I.click(locate('button').withChild(locate('span').withText('Delete')).inside(locate('div').withAttr({role:'dialog', 'aria-label':'Do you really want to delete this folder and all playlists inside?'})));
});

Scenario('delete playlist', async ({ I }) => {
    I.rightClick(locate('div').withAttr({role:'button'}).inside(locate('ul').withAttr({role:'list', 'aria-label':'Your Library'})));
    I.click(locate('button').withAttr({role:'menuitem'}).inside(locate('div').withAttr({'data-testid':'context-menu'})).
            withChild(locate('span').withText('Delete')));
    I.click(locate('button').withChild(locate('span').withText('Delete')).inside(locate('div').withAttr({role:'dialog', 'aria-label':'Delete Test Playlist?'})));
});

export {}