var app = function (data) {
    var el = redom.el;
    var mount = redom.mount;

    mount(document.body, el('div', {
        id: 'root'
    }, [
        el('section', {
            id: 'intro'
        }, [
            el('div', {
                className: 'title'
            }, [
                el('img', {
                    src: '/img/kevin.jpg',
                    alt: data.info.name,
                    title: data.info.name
                })
            ]),
            el('div', {
                className: 'content'
            }, [
                el('h1', null, data.info.name),
                el('h2', null, data.info.title),
                el('p', null, [
                    '(Full resume at ',
                    el('a', {
                        href: ''
                    }, 'http://kevinselwyn.com/resume'),
                    ')'
                ]),
                el('ul', {
                    className: 'social'
                }, data.social.map(function (social) {
                    return el('li', {
                        className: social.network
                    }, [
                        el('a', {
                            href: social.url,
                            target: '_blank'
                        }, social.network)
                    ])
                }))
            ]),
            el('div', {
                className: 'clearfix'
            })
        ]),
        el('section', {
            id: 'contact'
        }, [
            el('div', {
                className: 'title'
            }, [
                el('h2', null, 'Contact')
            ]),
            el('div', {
                className: 'content'
            }, [
                el('p', null, [
                    el('strong', null, 'Email:'),
                    ' ',
                    el('a', {
                        href: 'mailto:' + data.info.email
                    }, data.info.email),
                    el('br'),
                    el('strong', null, 'Website:'),
                    ' ',
                    el('a', {
                        href: data.info.website
                    }, data.info.website)
                ])
            ]),
            el('div', {
                className: 'clearfix'
            })
        ]),
        el('section', {
            id: 'profile'
        }, [
            el('div', {
                className: 'title'
            }, [
                el('h2', null, 'Profile')
            ]),
            el('div', {
                className: 'content'
            }, [
                el('p', null, data.info.profile)
            ]),
            el('div', {
                className: 'clearfix'
            })
        ]),
        el('section', {
            id: 'employment'
        }, [
            el('div', {
                className: 'title'
            }, [
                el('h2', null, 'Employment')
            ]),
            el('div', {
                className: 'content'
            }, data.employment.map(function (employment) {
                return el('div', null, [
                    el('p', null, [
                        el('strong', null, employment.employer),
                        ' ',
                        el('em', null, employment.start + ' - ' + employment.end),
                        el('br'),
                        el('small', employment.title)
                    ]),
                    el('br'),
                    el('p', null, 'Reponsibilities included:'),
                    el('ul', employment.description.map(function (description) {
                        return el('li', null, description);
                    }))
                ]);
            })),
            el('div', {
                className: 'clearfix'
            })
        ]),
        el('section', {
            id: 'education'
        }, [
            el('div', {
                className: 'title'
            }, [
                el('h2', null, 'Education')
            ]),
            el('div', {
                className: 'content'
            }, data.education.map(function (education) {
                return el('p', null, [
                    el('strong', null, education.school),
                    ' ',
                    el('em', null, education.start + ' - ' + education.end),
                    el('br'),
                    el('em', null, education.degree),
                    el('br'),
                    el('br')
                ]);
            })),
            el('div', {
                className: 'clearfix'
            })
        ]),
        el('section', {
            id: 'skills'
        }, [
            el('div', {
                className: 'title'
            }, [
                el('h2', null, 'Skills')
            ]),
            el('div', {
                className: 'content'
            }, data.skills.map(function (skill) {
                return el('div', null, [
                    el('p', null, [
                        el('strong', null, skill.skills.join(', ')),
                        ' ',
                        el('em', null, skill.level)
                    ]),
                    el('div', {
                        className: 'progress ' + skill.level
                    }, [
                        el('div', {
                            className: 'experience'
                        })
                    ])
                ]);
            })),
            el('div', {
                className: 'clearfix'
            })
        ]),
        el('section', {
            id: 'interests'
        }, [
            el('div', {
                className: 'title'
            }, [
                el('h2', null, 'Interests')
            ]),
            el('div', {
                className: 'content'
            }, [
                el('p', null, data.info.interests)
            ]),
            el('div', {
                className: 'clearfix'
            })
        ])
    ]), document.body.firstChild);
};

var xhr = new XMLHttpRequest();

xhr.addEventListener('load', function () {
    app(xhr.response.data);
});

xhr.open('GET', '/data/resume.json', true);
xhr.responseType = 'json';
xhr.send(null);
