requirejs(['ext_editor_io2', 'jquery_190', 'raphael_210'],
    function (extIO, $) {
        function grid_painting_visualization(tgt_node, data) {
            if (!data || !data.ext) {
                return
            }

            /**
             * 
             * attr
             * 
             */
            const attr = {
                cell: {
                    designated: {
                        'fill': '#E4C8B3',
                        'opacity' : 10,
                    },
                    undesignated: {
                    },
                },
                letter: {
                    designated: {
                        'font-size': '15px',
                        'font-family': 'Times',
                        'font-weight': 'bold',
                        'fill': 'black',
                    },
                    undesignated: {
                        'font-size': '15px',
                        'font-family': 'Times',
                        'font-weight': 'bold',
                        'fill': '#BBBBBB',
                    },
                },
                arrow: {
                    'fill': 'blue',
                    'stroke': 'blue',
                    'fill': '#F0801A',
                    'stroke': '#F0801A',
                    'opacity' : .4,
                },
                brush: {
                    'fill': 'blue',
                    'stroke': 'blue',
                    'fill': '#F0801A',
                    'stroke': '#F0801A',
                    'opacity' : .9,
                },
            }

            /**
            * 
            * letter_to_coord
            * 
            */
            function letter_to_coord(letter) {
                const n = au.indexOf(letter)
                return [x, y] = [n % 5, Math.floor(n / 5)]
            }

            /**
            * 
            * values
            * 
            */
            const dcells = data.in[0]
            const arrows = data.ext.explanation
            const grid_seize_px_h = 200
            const grid_seize_px_w = 200
            const os = 10
            const unit = 200 / 5
            const au = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

            /**
            * 
            * paper
            * 
            */
            const paper = Raphael(tgt_node, grid_seize_px_w + os * 2, grid_seize_px_h + os * 2)

            /**
            * 
            * draw grid
            * 
            */
            for (let i = 0; i < 5; i += 1) {
                for (let j = 0; j < 5; j += 1) {
                    let letter = au[i * 5 + j]
                    paper.rect(j * unit + os, i * unit + os, unit, unit).attr(
                        dcells.indexOf(letter) >= 0 ? attr.cell.designated: attr.cell.undesignated)
                }
            }

            /**
            * 
            * draw arrows
            * 
            */
            for (const [from, to] of arrows) {
                const [fx, fy] = letter_to_coord(from)
                const [tx, ty] = letter_to_coord(to)
                const [x1, y1] = [Math.min(fx, tx), Math.min(fy, ty)]
                const [x2, y2] = [Math.max(fx, tx), Math.max(fy, ty)]
                if ((x2 - x1) < (y2 - y1)) {
                    // v
                    const d1 = (x2 - x1) / 4 * .25
                    paper.path(['M', (x1+.25) * unit + os, (y1+.25) * unit + os,
                        'v', (y2 - y1 + .5 - d1) * unit,
                        'L', (x1 + (x2 - x1) / 2 + .5) * unit + os, (y2+1) * unit + os,
                        'l', (x2 - x1 + .5) * unit * .5, unit * -(.25 + d1),
                        'L', (x2+.75) * unit + os, (y1+.25) * unit + os,
                        'z',
                    ]).attr(attr.arrow)
                } else {
                    // h
                    const d1 = (y2 - y1) / 4 * .25
                    paper.path(['M', (x1+.25) * unit + os, (y1+.25) * unit + os,
                        'h', (x2 - x1 + .5 - d1) * unit,
                        'L', (x2+1) * unit + os, (y1 + (y2 - y1) / 2 + .5) * unit + os,
                        'l', unit * -(.25 + d1), (y2 - y1 + .5) * unit * .5,
                        'L', (x1+.25) * unit + os, (y2+.75) * unit + os,
                        'z',
                    ]).attr(attr.arrow)
                }
            }

            /**
            * 
            * draw brushes
            * 
            */
            // for (const a of arrows.map(x=>x[0])) {
            //     const [bx, by] = letter_to_coord(a)
            //     const brush_01 = paper.path("M336,157.4h135.7c-32.4-21.3-44.4-57.2-44.4-86.2c0-18.8,2.6-46.9,4.3-74.2c1.7-23,3.4-44.4,3.4-56.3 c0-29-11.9-71.7-29-71.7c-4.3,0-8.5,1.7-11.1,5.1c-17.1,17.1-17.1,68.3-17.1,68.3c0,33.3,2.6,52.1,5.1,68.3c2.6,17.9,5.1,33.3,3.4,61.4C382.9,119,354.7,145.5,336,157.4z M290.7,364.8c-1.7,0.9-2.6,3.4-1.7,5.1c0.9,2.6,3.4,5.1,8.5,6c6,0.9,13.7,1.7,22.2,2.6l0,0 c11.9,0.9,23-23,29.9-41.8c0,0-3.4,26.5-7.7,43.5c7.7,0,16.2,0.9,25.6,0.9c36.7,0,69.1-2.6,87-6.8c10.2-2.6,17.1-9.4,19.6-17.9 c7.7-31.6,10.2-85.3,11.1-101.5H318C318,273.5,316.3,346.9,290.7,364.8zM318,201.8h167.3v-8.5h-167.3zM318, 218.9h167.3v17.9h-167.3v-17.9zM318, 175.3h167.3v17.9h-167.3v-17.9z")
            //     const x = -4470 + bx * 500
            //     const y = -1250 + by * 500
            //     brush_01.transform(`s.08t${x}, ${y}`).attr(attr.brush)
            // }

            /**
            * 
            * draw letters
            * 
            */
            for (let i = 0; i < 5; i += 1) {
                for (let j = 0; j < 5; j += 1) {
                    let letter = au[i * 5 + j]
                    paper.text(j * unit + os + unit / 2, i * unit + os + unit/2, letter).attr(
                        dcells.indexOf(letter) >= 0 ? attr.letter.designated: attr.letter.undesignated)
                }
            }
        }

        var io = new extIO({
            animation: function ($expl, data) {
                grid_painting_visualization(
                    $expl[0],
                    data,
                );
            }
        });
        io.start();
    }
);
