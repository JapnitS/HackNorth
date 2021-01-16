const Apify = require('apify');
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );

function clean (string){
    string=string.trim();
    string=string.replace(/\s{2,}/g,";"); //white space
    string = string.replace(/(\r\n|\n|\r)/gm, ""); //new lines
    return string;
}
function clean_locations(locations){
    cleaned=[];
    for (i = 0; i < locations.length; i++) { 
        new_loc=locations[i]
        
            console.log ("prev loc: ", locations[i])
            //remove space/new lines beggining:
            if (new_loc.charAt(0) == " "){
                new_loc=new_loc.substring(1);
            }
            if (new_loc.charAt(0) == "\n"){
                new_loc=new_loc.substring(2);
            }
            //remove the weird thing
            new_loc=new_loc.replace('\"','');
            new_loc=new_loc.replace('\"','');
            
            //remove brackets
            new_loc=new_loc.replace("(", '');
            new_loc=new_loc.replace(")", '');
            //remove emoji
            new_loc=new_loc.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');

            //remove unessasary things after these characters:
            idx=new_loc.indexOf("@");
            if (idx !=-1 && idx !=0){
                console.log ("1")
                console.log ("idx: ",idx)
                new_loc=new_loc.substring(0,idx);
                console.log ("new loc: ", new_loc);
            }
            idx2=new_loc.indexOf("|");
            if (idx2 !=0 && idx2 !=-1){
                console.log ("2")
                console.log ("idx: ",idx2)
                new_loc=new_loc.substring(0,idx2);
                console.log ("new loc: ", new_loc);
            }
            idx3=new_loc.indexOf("©");
            if (idx3 !=-1 && idx3!=0){
                console.log ("3")
                console.log ("idx: ",idx3)
                new_loc=new_loc.substring(0,idx3);
                console.log ("new loc: ", new_loc);
            }
            idx4=new_loc.indexOf("\n");
            if (idx4 !=-1 && idx4 !=0){
                console.log ("4")
                console.log ("idx: ",idx4)
                new_loc=new_loc.substring(0,idx4);
                console.log ("new loc: ", new_loc);
            }
            idx5=new_loc.indexOf("❄️");
            if (idx5 !=-1 && idx5 !=0){
                console.log ("5")
                console.log ("idx: ",idx5)
                new_loc=new_loc.substring(0,idx5);
                console.log ("new loc: ", new_loc);
            }
            idx6=new_loc.indexOf("by");
            if (idx6 !=-1 && idx6 !=0){
                console.log ("6")
                console.log ("idx: ",idx6)
                new_loc=new_loc.substring(0,idx6);
                console.log ("new loc: ", new_loc);
            }
            
            //remove ending space
            if (new_loc.charAt(new_loc.length-1) == " "){
                new_loc=new_loc.substring(0,new_loc.length-1);
            }
            cleaned.push(new_loc)
        
        
    }
    return cleaned
}

Apify.main(async () => {
    const input = await Apify.getValue('INPUT')
    const dataset = await Apify.openDataset('tumblr-dataset');

    // Object from `./apify_storage/key_value_stores/default/INPUT.json`
    if (!input || !input.keyword) throw new Error('INPUT must contain a keyword!')

    const requestQueue = await Apify.openRequestQueue();
    await requestQueue.addRequest({ url: `https://www.tumblr.com/search/travel+${input.keyword}` });
    
    const handlePageFunction = async ({ request, $ }) => {
        const title = $('.search_term_heading').text();
        
        //now, get all the info:
        const locations = $('.post_body').text().split("        ");
       
        const imglinks=  $('.photo[src^="https://64.media.tumblr.com"], .image[src^="https://64.media.tumblr.com"]')
            .map((i, el) => $(el).attr('src'))
            .get()
        dataset.pushData({ title: title, locations: clean_locations(locations), imglinks: imglinks});
        
        /*
        const prices=$('.a-price').text();
        const links = $('.a-section div h2 a[href]')
            .map((i, el) => $(el).attr('href'))
            .get();

        

        dataset.pushData({ title: title, products: clean(products), prices: prices, imglinks: imglinks, links: links});
        */
        console.log(`Title: ${title}.`);
    };

    // Set up the crawler, passing a single options object as an argument.
    const crawler = new Apify.CheerioCrawler({
        requestQueue,
        handlePageFunction,
    });

    await crawler.run();
});