import { Label, LabelType } from 'labeling-tool/lib/models/Label'
import { Markup, PageMarkup } from 'labeling-tool/lib/models/Markup'
import { Table, CellsMerge, CellValue } from 'labeling-tool/lib/models/Table'

const markup = new Markup(
  new Map([
    [
      1,
      new PageMarkup(
        [
          new Label(
            0.06393357168595783,
            0.05383744988741601,
            0.08771333785411901,
            0.010767754885299251,
            'dates',
            undefined,
            LabelType.DATE,
            'October 2022',
            {
              data: 'some meta for dates label'
            },
            1
          ),
          new Label(
            0.04290160996843245,
            0.34946976580181666,
            0.09562993640075165,
            0.014092072696240472,
            'IVESParticipantName',
            undefined,
            LabelType.STRING,
            'Default Inc',
            {
              data: 'some meta for dates label'
            },
            1
          ),
          new Label(
            0.043441769591663654,
            0.6490390380748076,
            0.13032354869251545,
            0.0153807009393025,
            'dates',
            undefined,
            LabelType.DATE,
            '12/31/2017',
            {
              data: 'some meta for dates label'
            },
            1
          ),
          new Label(
            0.3073821149180449,
            0.648571215965849,
            0.1327818182854447,
            0.015869099392655316,
            'dates',
            undefined,
            LabelType.DATE,
            '12/31/2018',
            {
              data: 'some meta for dates label'
            },
            1
          ),
          new Label(
            0.5674914156661374,
            0.6490390380748075,
            0.13250343364840492,
            0.014746331561620049,
            'dates',
            undefined,
            LabelType.DATE,
            '12/31/2019',
            {
              data: 'some meta for dates label'
            },
            1
          ),
          new Label(
            0.5568353564407199,
            0.7750822498657118,
            0.13497282633952326,
            0.010946047593319127,
            'dates',
            undefined,
            LabelType.DATE,
            '2/20/2022 13:45:34 PST',
            {
              data: 'some meta for dates label'
            },
            1
          ),
          new Label(
            0.04086885662808417,
            0.7438947877485177,
            0.017,
            0.0119,
            'signatory',
            undefined,
            LabelType.CHECKMARK,
            true,
            {
              data: 'some meta for signatory value label'
            },
            0.66
          ),
          new Label(
            0.040819706762835896,
            0.4425992308283083,
            0.11081355218238177,
            0.014704350557812081,
            'companyName',
            undefined,
            LabelType.STRING,
            'Client Name',
            {
              data: 'some meta for companyName label'
            },
            1
          ),
          new Label(
            0.9136065063059686,
            0.9616959299916109,
            0.04788264491772439,
            0.008646815303150188,
            'date',
            undefined,
            LabelType.DATE,
            '10-2022',
            {
              data: 'some meta for date value label'
            },
            1
          ),
          new Label(
            0.6856229223468338,
            0.3088420204191371,
            0.028311453333132522,
            0.012883688654459899,
            'countryStates',
            1,
            LabelType.STRING,
            'CA',
            {
              data: 'some meta for countryStates value 0 label'
            },
            1
          ),
          new Label(
            0.6840409490696205,
            0.37546351423962365,
            0.02740990610107532,
            0.012768833957237963,
            'countryStates',
            2,
            LabelType.STRING,
            'CA',
            {
              data: 'some meta for countryStates value 1 label'
            },
            1
          ),
          new Label(
            0.09988527555887167,
            0.793151998157689,
            0.0165081537141209,
            0.01317355555958053,
            'dateMatching',
            1,
            LabelType.CHECKMARK,
            true,
            {
              data: 'some meta for dateMatching value 0 label'
            },
            0.99
          ),
          new Label(
            0.0982459313913282,
            0.9068926782835874,
            0.01818150826208703,
            0.013411455206580871,
            'dateMatching',
            2,
            LabelType.CHECKMARK,
            true,
            {
              data: 'some meta for dateMatching value 1 label'
            },
            0.99
          ),
          new Label(
            0.7826983170700285,
            0.29814753051356113,
            0.04928204756916581,
            0.007823520168100352,
            'zipCodes',
            1,
            LabelType.KEY,
            'ZIP code',
            {
              data: 'some meta for zipCodes key 0 label'
            },
            1
          ),
          new Label(
            0.7701638945358309,
            0.3071815091732683,
            0.058524580925658924,
            0.01397109172422374,
            'zipCodes',
            1,
            LabelType.VALUE,
            '90014',
            {
              data: 'some meta for zipCodes value 0 label'
            },
            1
          ),
          new Label(
            0.5058196576341617,
            0.2663129561679702,
            0.07696718824247445,
            0.01556441054941468,
            'city',
            undefined,
            LabelType.ENUM,
            'Anytown',
            {
              data: 'some meta for city label'
            },
            1
          ),
          new Label(
            0.7884356937402027,
            0.365851551393276,
            0.04843538812898489,
            0.009110996162200848,
            'zipCodes',
            2,
            LabelType.KEY,
            'ZIP code',
            {
              data: 'some meta for zipCodes key 1 label'
            },
            1
          ),
          new Label(
            0.7693048782845151,
            0.3773858278959253,
            0.056936211472491755,
            0.011509509162627113,
            'zipCodes',
            2,
            LabelType.VALUE,
            '90134',
            {
              data: 'some meta for zipCodes value 1 label'
            },
            1
          ),
          new Label(
            0.522951610681921,
            0.3922746587856061,
            0.08605693106943209,
            0.009287384101159613,
            'uniqueIdentifier',
            undefined,
            LabelType.KEY,
            'Unique identifier',
            {
              data: 'some meta for uniqueIdentifier key label'
            },
            1
          ),
          new Label(
            0.5092606327130803,
            0.40304216934060805,
            0.10631936349150949,
            0.013799999999999993,
            'uniqueIdentifier',
            undefined,
            LabelType.VALUE,
            '1234567890',
            {
              data: 'some meta for uniqueIdentifier value label'
            },
            1
          ),
          new Label(
            0.5024589826147716,
            0.5827123551368235,
            0.045901636690999996,
            0.014567808397999999,
            'formNumbers',
            1,
            LabelType.ENUM,
            '1098',
            {}
          ),
          new Label(
            0.654098318112,
            0.582712355137,
            0.044262292524,
            0.014567808398,
            'formNumbers',
            2,
            LabelType.ENUM,
            '5498',
            {}
          ),
          new Label(
            0.157503132687,
            0.5485651483029998,
            0.017023958663,
            0.011543603723923665,
            'returnTranscript',
            undefined,
            LabelType.CHECKMARK,
            true,
            {}
          )
        ],
        [
          new Table(
            [
              0.5006813411129705,
              0.6776796525452824,
              0.7653845655088618,
              0.965383105549986
            ],
            [
              0.11839306413787538,
              0.13208455108630432,
              0.14475221056277712,
              0.15995340193454455,
              0.18402195493984289,
              0.20112329519647254
            ],
            [
              new CellsMerge(0, 0, 3, 1),
              new CellsMerge(3, 0, 3, 1),
              new CellsMerge(4, 0, 3, 1)
            ],
            [
              new CellValue(
                0,
                0,
                '2a. Spouse\'s current name (if joint return and transcripts are requested for both taxpayers)',
                1
              ),
              new CellValue(
                1,
                0,
                'i. Spouse’s first name',
                1
              ),
              new CellValue(
                1,
                1,
                'ii. Middle initial',
                1
              ),
              new CellValue(
                1,
                2,
                'iii. Spouse’s last name',
                1
              ),
              new CellValue(
                2,
                0,
                'Barbara',
                1
              ),
              new CellValue(
                2,
                1,
                'L',
                1
              ),
              new CellValue(
                2,
                2,
                'Testco',
                1
              ),
              new CellValue(
                3,
                0,
                '2b. Spouse\'s taxpayer identification number (if joint return and transcripts are requested for both taxpayers)',
                1
              ),
              new CellValue(
                4,
                0,
                '987-65-4321',
                1
              )
            ],
            {
              data: 'some meta for table'
            },
            'taxpayerSpousesInfo'
          ),
          new Table(
            [
              0.034660284184114036,
              0.1754098195314298,
              0.2696750577214527,
              0.49835916900028376
            ],
            [
              0.11678526742746678,
              0.13174366924501388,
              0.1431445627738394,
              0.15771237117178313,
              0.1805141582294342,
              0.19824888145988753
            ],
            [
              new CellsMerge(0, 0, 3, 1),
              new CellsMerge(3, 0, 3, 1),
              new CellsMerge(4, 0, 3, 1)
            ],
            [
              new CellValue(
                0,
                0,
                '1a. Current name',
                1
              ),
              new CellValue(
                1,
                0,
                'i. First name',
                1
              ),
              new CellValue(
                1,
                1,
                'ii. Middle initial',
                1
              ),
              new CellValue(
                1,
                2,
                'iii. Last name/BMF company name',
                1
              ),
              new CellValue(
                2,
                0,
                'Charlie',
                1
              ),
              new CellValue(
                2,
                1,
                'J',
                1
              ),
              new CellValue(
                2,
                2,
                'Testco',
                1
              ),
              new CellValue(
                3,
                0,
                '1b. First taxpayer identification number (see instructions)',
                1
              ),
              new CellValue(
                4,
                0,
                '123-45-6789',
                1
              )
            ],
            {},
            'taxpayerInfo'
          ),
          new Table(
            [
              0.0936660238101635,
              0.9639333749691581
            ],
            [
              0.8081760415622181,
              0.8208643647167948,
              0.8398658539315038,
              0.853800279355624,
              0.8715350179110517
            ],
            [],
            [
              new CellValue(
                0,
                0,
                'Print/Type name',
                1
              ),
              new CellValue(
                1,
                0,
                'Charlie J Testco',
                1
              ),
              new CellValue(
                2,
                0,
                'Title (if line 1a above is a corporation, partnership, estate, or trust)',
                1
              ),
              new CellValue(
                3,
                0,
                'Engineer',
                1
              )
            ],
            {
              data: 'some meta for table'
            },
            'tables',
            1
          )
        ]
      )
    ],
    [
      2,
      new PageMarkup(
        undefined,
        [
          new Table(
            [
              0.03363297900159569,
              0.18196719283792423,
              0.3303216549065317
            ],
            [
              0.4799558452585425,
              0.501639328813487,
              0.5409090731905527,
              0.5738581830799651,
              0.6048807535467404,
              0.6365464106735089
            ],
            [
              new CellsMerge(0, 0, 2, 1)
            ],
            [
              new CellValue(
                0,
                0,
                'Chart for ordering transcripts',
                1
              ),
              new CellValue(
                1,
                0,
                'If your assigned Service\nCenter is:',
                1
              ),
              new CellValue(
                1,
                1,
                'Fax the requests with\nthe approved\ncoversheet to:',
                1
              ),
              new CellValue(
                2,
                0,
                'Austin Submission\nProcessing Center',
                1
              ),
              new CellValue(
                2,
                1,
                'Austin IVES Team\n844-249-6238',
                1
              ),
              new CellValue(
                3,
                0,
                'Kansas City Submission\nProcessing Center',
                1
              ),
              new CellValue(
                3,
                1,
                'Kansas City IVES Team\n844-249-8128',
                1
              ),
              new CellValue(
                4,
                0,
                'Ogden Submission\nProcessing Center',
                1
              ),
              new CellValue(
                4,
                1,
                'Ogden IVES Team\n844-249-8129',
                1
              )
            ],
            {
              data: 'some meta for table'
            },
            'tables',
            2
          ),
          new Table(
            [
              0.671175306103395,
              0.9204917658463582,
              0.9614817232738364
            ],
            [
              0.780383820058632,
              0.7942625960211771,
              0.8044316981868664,
              0.8309984925147635
            ],
            [],
            [
              new CellValue(
                0,
                0,
                'Learning about the law or the form . . . . . . ',
                1
              ),
              new CellValue(
                0,
                1,
                '10 min',
                1
              ),
              new CellValue(
                1,
                0,
                'Preparing the form . . . . . . . . . . . . . . .',
                1
              ),
              new CellValue(
                1,
                1,
                '12 min',
                0.98
              ),
              new CellValue(
                2,
                0,
                'Copying, assembling, and sending\nthe form to the IRS . . . . . . . . . . . . . . .',
                1
              ),
              new CellValue(
                2,
                1,
                '20 min',
                1
              )
            ],
            {
              data: 'some meta for table'
            },
            'tables',
            3
          )
        ]
      )
    ]
  ])
)

export {
  markup
}
