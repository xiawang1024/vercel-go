import styles from '../styles/About.module.css'
import Image from 'next/image'

function About({ dataList }) {
    return <div className={styles.container}>
        <h2>About page</h2>
        {
            dataList.map(item => <div className={styles.item}>
                <h3>{item.title}</h3>
                {
                    item.coverImagesList[0] && item.coverImagesList[0].url && <Image width={200}
                        height={200} src={item.coverImagesList[0].url}></Image>
                }

            </div>)
        }
    </div>
}

export async function getStaticProps(context) {
    const res = await fetch("https://pubmob.dianzhenkeji.com/cms/articles?tenantId=henanradio&channelId=1216567500624498688&pageNo=1&pageSize=10")
    const data = await res.json()
    const dataList = data.result.content
    if (dataList.length === 0) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            dataList
        },
        revalidate: 1
    }
}



export default About