(function () {
    var el = React.createElement;
    var Fragment = React.Fragment;
    var useEffect = React.useEffect;
    var useState = React.useState;
    var root = document.querySelector('#root');

    var Intro = function (props) {
        var info = props.info;
        var social = props.social;

        return el('section', {
            id: 'intro'
        }, [
            el('div', {
                className: 'title'
            }, [
                el('img', {
                    src: '/img/kevin.jpg',
                    alt: info.name,
                    title: info.name
                })
            ]),
            el('div', {
                className: 'content'
            }, [
                el('h1', null, info.name),
                el('h2', null, info.title),
                el('p', null, [
                    '(Full resume at ',
                    el('a', {
                        href: 'https://kevinselwyn.com/resume'
                    }, 'https://kevinselwyn.com/resume'),
                    ')'
                ]),
                el('ul', {
                    className: 'social'
                }, social.map(function (social) {
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
        ]);
    };

    var Contact = function (props) {
        var info = props.info;

        return el('section', {
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
                        href: 'mailto:' + info.email
                    }, info.email),
                    el('br'),
                    el('strong', null, 'Website:'),
                    ' ',
                    el('a', {
                        href: info.website
                    }, info.website),
                    el('br'),
                    el('span', {
                        className: 'download-pdf'
                    }, [
                        el('strong', null, '↳ '),
                        el('a', {
                            href: '/data/resume.pdf',
                            target: '_blank',
                            download: 'Kevin Selwyn - Resume.pdf'
                        }, 'Download resume as PDF')
                    ])
                ])
            ]),
            el('div', {
                className: 'clearfix'
            })
        ]);
    };

    var Profile = function (props) {
        var info = props.info;

        return el('section', {
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
                el('p', null, info.profile)
            ]),
            el('div', {
                className: 'clearfix'
            })
        ]);
    };

    var Projects = function (props) {
        var projects = props.projects;

        return el('section', {
            id: 'projects'
        }, [
            el('div', {
                className: 'title'
            }, [
                el('h2', null, 'Personal Projects')
            ]),
            el('div', {
                className: 'content'
            }, projects.map(function (item) {
                return el('div', {
                    className: 'project'
                }, [
                    el('div', {
                        className: 'info'
                    }, [
                        el('p', null, [
                            el('strong', null, item.name),
                            el('br'),
                            el('small', null, [
                                el('a', {
                                    href: item.url,
                                    target: '_blank'
                                }, item.url)
                            ])
                        ]),
                        el(Fragment, null, item.description.map(function (description) {
                            return el('p', null, description);
                        }))
                    ]),
                    el('div', {
                        className: 'meta'
                    }, [
                        el('div', {
                            className: 'meta__item'
                        }, [
                            el('small', null, 'Language(s):'),
                            el('div', {
                                className: 'languages'
                            }, (
                                item.languages.map(function (language) {
                                    return el('small', {
                                        className: 'chip'
                                    }, language);
                                })
                            )),
                        ]),
                        el('div', {
                            className: 'meta__item'
                        }, [
                            el('small', null, 'Tech:'),
                            el('div', {
                                className: 'tech'
                            }, (
                                item.tech.map(function (language) {
                                    return el('small', {
                                        className: 'chip'
                                    }, language);
                                })
                            ))
                        ]),
                        el('div', {
                            className: 'clearfix'
                        })
                    ]),
                    el('div', {
                        className: 'clearfix'
                    })
                ]);
            })),
            el('div', {
                className: 'clearfix'
            })
        ]);
    };

    var Employment = function (props) {
        var employment = props.employment;

        return el('section', {
            id: 'employment'
        }, [
            el('div', {
                className: 'title'
            }, [
                el('h2', null, 'Employment')
            ]),
            el('div', {
                className: 'content'
            }, employment.map(function (item) {
                return el('div', {
                    className: 'employment'
                }, [
                    el('div', {
                        className: 'info'
                    }, [
                        el('p', null, [
                            el('strong', null, (
                                item.links.length !== 1 ? (
                                    item.employer
                                ) : (
                                    el('a', {
                                        href: item.links[0].url,
                                        target: '_blank'
                                    }, item.employer)
                                )
                            )),
                            ' ',
                            el('em', null, item.start + ' - ' + item.end),
                            el('br'),
                            item.links.length <= 1 ? null : (
                                el(Fragment, null, [
                                    el('small', null, [
                                        el('span', null, '↳ '),
                                        item.links.map(function (link, i, links) {
                                            return el(Fragment, null, [
                                                el('a', {
                                                    href: link.url,
                                                    target: '_blank'
                                                }, link.name),
                                                (i === links.length - 1) ? null : (
                                                    el('span', null, ', ')
                                                )
                                            ]);
                                        })
                                    ]),
                                    el('br')
                                ])
                            ),
                            el('small', null, item.title),
                            item.description.map(function (description) {
                                return el('p', null, description);
                            })
                        ]),
                    ]),
                    el('div', {
                        className: 'meta'
                    }, (
                        el(Fragment, null, [
                            !item.languages ? null : (
                                el('div', {
                                    className: 'meta__item'
                                }, [
                                    el('small', null, 'Language(s):'),
                                    el('div', {
                                        className: 'languages'
                                    }, (
                                        item.languages.map(function (language) {
                                            return el('small', {
                                                className: 'chip'
                                            }, language);
                                        })
                                    )),
                                ])
                            ),
                            !item.tech ? null : (
                                el('div', {
                                    className: 'meta__item'
                                }, [
                                    el('small', null, 'Tech:'),
                                    el('div', {
                                        className: 'tech'
                                    }, (
                                        item.tech.map(function (language) {
                                            return el('small', {
                                                className: 'chip'
                                            }, language);
                                        })
                                    ))
                                ])
                            )
                        ])
                    )),
                    el('div', {
                        className: 'clearfix'
                    })
                ]);
            })),
            el('div', {
                className: 'clearfix'
            })
        ]);
    };

    var Education = function (props) {
        var education = props.education;

        return el('section', {
            id: 'education'
        }, [
            el('div', {
                className: 'title'
            }, [
                el('h2', null, 'Education')
            ]),
            el('div', {
                className: 'content'
            }, education.map(function (item) {
                return el('div', {
                    className: 'education'
                }, el('p', null, [
                    el('strong', null, item.school),
                    ' ',
                    el('em', null, item.start + ' - ' + item.end),
                    el('br'),
                    el('em', null, item.degree)
                ]))
            })),
            el('div', {
                className: 'clearfix'
            })
        ]);
    };

    var Skills = function (props) {
        var skills = props.skills;

        return el('section', {
            id: 'skills'
        }, [
            el('div', {
                className: 'title'
            }, [
                el('h2', null, 'Skills')
            ]),
            el('div', {
                className: 'content'
            }, [
                el('p', null, 'Language(s):'),
                (skills.language || []).map(function (item) {
                    return el('small', {
                        className: 'chip'
                    }, item);
                }),
                el('p', null, 'Tech:'),
                (skills.tech || []).map(function (item) {
                    return el('small', {
                        className: 'chip'
                    }, item);
                })
            ]),
            el('div', {
                className: 'clearfix'
            })
        ]);
    };

    var Interests = function (props) {
        var info = props.info;

        return el('section', {
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
                el('p', null, info.interests)
            ]),
            el('div', {
                className: 'clearfix'
            })
        ]);
    };

    var Resume = function (props) {
        var _data = useState({
            info: {},
            social: [],
            projects: [],
            employment: [],
            education: [],
            skills: []
        });
        var data = _data[0];
        var setData = _data[1];
        var onStateLoad = function (e) {
            setData(e.target.response.data);
        };

        useEffect(function () {
            var xhr = new XMLHttpRequest();

            xhr.addEventListener('load', onStateLoad, true);

            xhr.open('GET', props.url, true);
            xhr.responseType = 'json';
            xhr.send(null);

            return function () {
                xhr.removeEventListener('load', onStateLoad, true);
            };
        }, []);

        return el(Fragment, null, [
            el(Intro, {
                info: data.info,
                social: data.social
            }),
            el(Contact, {
                info: data.info
            }),
            el(Profile, {
                info: data.info
            }),
            el(Projects, {
                projects: data.projects
            }),
            el(Employment, {
                employment: data.employment
            }),
            el(Education, {
                education: data.education
            }),
            el(Skills, {
                skills: data.skills
            }),
            el(Interests, {
                info: data.info
            })
        ]);
    };

    ReactDOM.render(el(Resume, {
        url: '/data/resume.json'
    }), root);
}());
