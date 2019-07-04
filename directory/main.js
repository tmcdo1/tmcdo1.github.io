type = {
    UTIL: 'Utility',
    PRO: 'Personal/Professional Site',
    BLOG: 'Blog',
    BIS: 'Business'
}

data = [
    {
        name: 'A. Londono',
        url: 'http://alondono.me/',
        url_name: 'alondono.me',
        owner: 'Alejandro Londono',
        type: type.PRO
    },
    {
        name: 'Lightweight Home Page',
        url: 'https://rsrickshaw.github.io/',
        url_name: 'rsrickshaw.github.io',
        owner: 'Rick Shaw',
        type: type.UTIL
    },
    {
        name: 'Living Introspectively',
        url: 'https://livingintrospectively.com/',
        url_name: 'livingintrospectively.com',
        owner: 'Thomas McDonald',
        type: type.BLOG
    },
    {
        name: 'Maximum PC Experience',
        url: 'https://maximumpcexperience.com/',
        url_name: 'maximumpcexperience.com',
        owner: 'Rick Shaw',
        type: type.BIS
    },
    {
        name: 'Phrasify',
        url: 'http://134.209.57.254:3030/',
        url_name: 'phrasiphy',
        owner: 'Jeff Hykin, Hannah Gooden, etc',
        type: type.UTIL
    },
    {
        name: 'Robertism',
        url: 'https://robertism.com/',
        url_name: 'robertism.com',
        owner: 'Robert Dominguez',
        type: type.PRO
    },
    {
        name: 'TAMU Clock',
        url: 'https://tamuclock.com/',
        url_name: 'tamuclock.com',
        owner: 'Rick Shaw',
        type: type.UTIL
    },
    {
        name: 'Thomas\' Personal Site',
        url: 'https://tmcdo1.github.io/',
        url_name: 'tmcdo1.github.io',
        owner: 'Thomas McDonald',
        type: type.PRO
    }
]

function createRow(siteInfo) {
    let row = document.createElement('TR')
    let name = document.createElement('TD')
    let url = document.createElement('TD')
    let owner = document.createElement('TD')
    let type = document.createElement('TD')
    
    let url_contents = document.createElement('A')
    url_contents.innerText = siteInfo.url_name
    url_contents.setAttribute('href', siteInfo.url)

    name.innerText = siteInfo.name
    url.appendChild(url_contents)
    owner.innerText = siteInfo.owner
    type.innerText = siteInfo.type

    row.appendChild(name)
    row.appendChild(url)
    row.appendChild(owner)
    row.appendChild(type)
    
    return row
}

function siteCompare(a, b) {
    const siteA = a.name.toUpperCase();
    const siteB = b.name.toUpperCase();

    let comparison = 0;
    if (siteA > siteB) {
        comparison = 1;
    } else if (siteA < siteB) {
        comparison = -1;
    }
    return comparison;
}

function main() {
    let dirTable = document.getElementById('dir-table')
    data.sort(siteCompare)
    dataRows = data.map(createRow)
    for(let row of dataRows) {
        dirTable.appendChild(row)
    }
}

main()